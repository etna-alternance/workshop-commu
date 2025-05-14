package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"

    "github.com/segmentio/kafka-go"
    _ "github.com/lib/pq"
)

type Order struct {
    ID               int      `json:"id"`
    DateAchat        string   `json:"date_achat"`
    UtilisateurID    int      `json:"utilisateur_id"`
    PrixTotal        float64  `json:"prix_total"`
    AdresseLivraison string   `json:"adresse_livraison"`
    Produits         []int    `json:"produits"`
}

var db *sql.DB
var kafkaWriter *kafka.Writer

func main() {
    var err error
    db, err = sql.Open("postgres", fmt.Sprintf(
        "user=%s password=%s dbname=%s host=%s sslmode=disable",
        os.Getenv("POSTGRES_USER"),
        os.Getenv("POSTGRES_PASSWORD"),
        os.Getenv("POSTGRES_DB"),
        os.Getenv("POSTGRES_HOST"),
    ))
    if err != nil {
        log.Fatal("Failed to connect to DB:", err)
    }

    kafkaWriter = &kafka.Writer{
        Addr:     kafka.TCP("kafka:9092"),
        Topic:    "order-events",
        Balancer: &kafka.LeastBytes{},
    }

    http.HandleFunc("/orders", func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case "GET":
            getOrders(w, r)
        case "POST":
            createOrder(w, r)
        default:
            http.Error(w, "Method not allowed", 405)
        }
    })
    http.HandleFunc("/orders/", handleOrderByID)

    fmt.Println("Order service listening on port 80")
    log.Fatal(http.ListenAndServe(":80", nil))
}

func getOrders(w http.ResponseWriter, r *http.Request) {
    rows, err := db.Query("SELECT id, date_achat, utilisateur_id, prix_total, adresse_livraison FROM orders")
    if err != nil {
        http.Error(w, "DB error", 500)
        return
    }
    defer rows.Close()

    var orders []Order
    for rows.Next() {
        var o Order
        err := rows.Scan(&o.ID, &o.DateAchat, &o.UtilisateurID, &o.PrixTotal, &o.AdresseLivraison)
        if err == nil {
            orders = append(orders, o)
        }
    }
    json.NewEncoder(w).Encode(orders)
}

func handleOrderByID(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Path[len("/orders/"):]
    if r.Method == "DELETE" {
        _, err := db.Exec("DELETE FROM orders WHERE id=$1", id)
        if err != nil {
            http.Error(w, "DB error", 500)
            return
        }
        // Ajouter ici sendKafkaEvent(Et mettez ici votre message, map[string]string{"order_id": id})
        w.WriteHeader(204)
    }
}

func createOrder(w http.ResponseWriter, r *http.Request) {
    if r.Method != "POST" {
        http.Error(w, "Invalid method", 405)
        return
    }

    var o Order
    err := json.NewDecoder(r.Body).Decode(&o)
    if err != nil {
        http.Error(w, "Bad JSON", 400)
        return
    }

    err = db.QueryRow(
        "INSERT INTO orders (date_achat, utilisateur_id, prix_total, adresse_livraison) VALUES ($1, $2, $3, $4) RETURNING id",
        o.DateAchat, o.UtilisateurID, o.PrixTotal, o.AdresseLivraison).Scan(&o.ID)
    if err != nil {
        http.Error(w, "DB insert failed", 500)
        return
    }

    // Ajouter ici sendKafkaEvent(Et mettez votre message ici, o)
    w.WriteHeader(201)
    json.NewEncoder(w).Encode(o)
}

func sendKafkaEvent(eventType string, payload interface{}) {
    data, _ := json.Marshal(payload)
    msg := kafka.Message{
        Key:   []byte(eventType),
        Value: data,
    }
    if err := kafkaWriter.WriteMessages(nil, msg); err != nil {
        log.Printf("Failed to write Kafka message: %v\n", err)
    }
}
