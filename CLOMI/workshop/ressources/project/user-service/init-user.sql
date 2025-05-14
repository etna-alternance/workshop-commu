CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    adresse TEXT
);

INSERT INTO users (nom, prenom, adresse) VALUES
('Dupont', 'Jean', 'Paris'),
('Martin', 'Claire', 'Lyon'),
('Durand', 'Paul', 'Marseille');
