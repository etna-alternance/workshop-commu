CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL
);

INSERT INTO users (nom, prenom, adresse) VALUES
('Dupont', 'Jean', 'Paris'),
('Martin', 'Claire', 'Lyon'),
('Durand', 'Paul', 'Marseille');
