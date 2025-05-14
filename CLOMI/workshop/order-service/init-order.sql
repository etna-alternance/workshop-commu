CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    date_achat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    utilisateur_id INTEGER REFERENCES users(id),
    prix_total NUMERIC(10,2),
    adresse_livraison TEXT
);
