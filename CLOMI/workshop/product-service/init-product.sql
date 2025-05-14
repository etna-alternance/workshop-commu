CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    description TEXT,
    prix NUMERIC(10,2)
);

INSERT INTO products (nom, description, prix) VALUES
('Corde', 'Corde d escalade', 79.99),
('Souris', 'Souris sans fil', 39.99),
('IPhone 12', 'Smartphone', 249.99),
('Casque', 'Casque audio', 129.99),
('Webcam', 'Webcam HD', 59.99);
