# WORKSHOP COMMUNAUTÉ MÉTIER | CLOUD ET MICRO-SERVICES

Bienvenue dans ce workshop dédié à la découverte et la mise en pratique des **micro-services** dans un environnement Dockerisé.

## Objectifs pédagogiques

À l’issue de ce workshop, vous serez capables de :

- Concevoir et implémenter des micro-services.
- Gérer l’**interconnexion** et l'**intercommunication** entre plusieurs services.
- Utiliser **Docker Compose** pour orchestrer vos services.
- Exposer vos APIs via une **API Gateway** simple : **Traefik**.

## Prérequis

- Avoir **Docker** et **Docker Compose** installés

---

## ⚙️ Technologies utilisées

- **Docker Compose** : orchestration des conteneurs
- **Traefik** : reverse proxy pour exposer les services HTTP
- **PostgreSQL** : base de données pour chaque microservice
- **Kafka** : système de messagerie pour les événements de commande

---

# Microservices Workshop – Architecture distribuée avec Docker Compose

Ce projet met en œuvre une architecture microservices complète basée sur **Docker Compose**, simulant Amazon

---

## Structure du projet

```
├── docker-compose.yml         # Orchestration de tous les services
├── notifier-service/          # Service de logs (Node.js)
│   ├── app.js
│   ├── Dockerfile
│   └── package.json
├── order-service/             # Service de gestion des commandes (Go)
│   ├── Dockerfile
│   ├── go.mod
│   ├── go.sum
│   ├── init-order.sql
│   └── main.go
├── product-service/           # Service de gestion des produits (Node.js)
│   ├── app.js
│   ├── Dockerfile
│   ├── init-product.sql
│   └── package.json
└── user-service/              # Service de gestion des utilisateurs (Python)
    ├── app.py
    ├── Dockerfile
    ├── init-user.sql
    └── requirements.txt
```

## Micro service user

|  Méthode | Endpoint     | Description                        |
| -------- | ------------ | ---------------------------------- |
| `GET`    | `/users`     | Récupère tous les utilisateurs     |
| `POST`   | `/users`     | Crée un nouvel utilisateur         |
| `PATCH`  | `/users/:id` | Met à jour un utilisateur existant |
| `DELETE` | `/users/:id` | Supprime un utilisateur            |

## Micro service product

| Méthode | Endpoint    | Description                    |
| ------- | ----------- | ------------------------------ |
| `GET`   | `/products` | Récupère la liste des produits |

## Micro service

|  Méthode | Endpoint      | Description                      |
| -------- | ------------- | -------------------------------- |
| `GET`    | `/orders`     | Récupère toutes les commandes    |
| `POST`   | `/orders`     | Crée une commande (Envoie un message via Kafka sur le topic `order-events`)     |
| `DELETE` | `/orders/:id` | Supprime une commande (Envoie un message via Kafka sur le topic `order-events`) |

---

## Déroulé du workshop

Pour faire marcher de manière complète l'application, il faudra implémenter un système de logs dans le service `notifier-service` en utilisant [KafkaJs](https://www.npmjs.com/package/kafkajs) afin de pouvoir traquer simplement les commandes

Cela consistera à lire les messages envoyés dans le topic `order-events` puis à print dans la console le contenu
