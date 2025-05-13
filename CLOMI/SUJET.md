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

## Stack technique proposée

Chaque micro-service pourra être développé dans n'importe quel langage de programmation, néanmoins voici quelques implémentations de connection à une **BDD PostgreSQL** et à un **Kafka** dans les langages suivants :

- Node.js (Express)
- Python (Flask)

Chaque micro-service dispose déjà d’une base permettant de se connecter à une base **PostgreSQL**.

---

## Déroulé du workshop

Pour faire marcher tout l'application il faudrait créer 4 services

### 1. Microservice Utilisateur

Gère les utilisateurs de la plateforme. Chaque utilisateur a :

- `id`
- `nom`
- `prénom`
- `adresse`

**API RESTful :**

| Méthode | Endpoint        | Description                     |
|---------|-----------------|---------------------            |
| GET     | /users          | Récupérer tous les utilisateurs |
| POST    | /users          | Créer un utilisateur            |
| PATCH   | /users/:id      | Modifier un utilisateur         |
| DELETE  | /users/:id      | Supprimer un utilisateur        |

---

### 2. Microservice Produits

Gère le catalogue de produits :

- `id`
- `nom`
- `description`
- `prix`

**API RESTful :**

| Méthode | Endpoint        | Description                 |
|---------|-----------------|-------------------------    |
| GET     | /products       | Récupérer tous les produits |

---

### 3. Microservice Commandes

Gère les commandes passées :

- `id`
- `date_achat`
- `utilisateur_id`
- `prix_total`
- `adresse_livraison`
- `produits`: liste de produits associés à la commande

**API RESTful :**

À chaque **POST** et **DELETE** envoie un message dans un topic **Kafka** à destination du service **Notifier**.

| Méthode | Endpoint        | Description                    |
|---------|-----------------|---------------------------     |
| GET     | /orders         | Récupérer toutes les commandes |
| POST    | /orders         | Créer une commande             |
| DELETE  | /orders/:id     | Supprimer une commande         |

### 4. Microservice Notifier

À chaque ajout ou suppréssion de commande, il notifie (print dans la console) quelle commande à été ajoutée ou supprimée en écoutant un topic Kafka.

**API Gateway :** utilisation de [**Traefik**](https://doc.traefik.io/) pour router les appels externes vers les bons services.

```sh
.
├── api-gateway/              # Config Traefik
├── user-service/             # Service utilisateur
├── product-service/          # Service produits
├── order-service/            # Service commandes
├── notifier-service/         # Service notification Kafka
└── docker-compose.yml
```

---

## Bonus

- Ajout d’un front-end minimal (React ou autre)
