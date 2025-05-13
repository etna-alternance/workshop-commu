CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    adresse TEXT
);

INSERT INTO users (nom, prenom, adresse) VALUES
('Dupont', 'Jean', '123 rue des Lilas, Paris'),
('Martin', 'Claire', '45 avenue du Général, Lyon'),
('Durand', 'Paul', '78 boulevard Haussmann, Paris');
