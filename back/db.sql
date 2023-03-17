DROP TABLE capitales;
DROP TABLE paises;

CREATE TABLE paises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  UNIQUE (nombre)
);

CREATE TABLE capitales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  pais_id INT,
  UNIQUE (nombre),
  FOREIGN KEY (pais_id) REFERENCES paises(id)
);

INSERT INTO paises (nombre) VALUES ('España');
INSERT INTO paises (nombre) VALUES ('Francia');
INSERT INTO paises (nombre) VALUES ('Alemania');


-- Usa los ID de los países para insertar las capitales correspondientes
INSERT INTO capitales (nombre, pais_id) VALUES ('Madrid', 1);
INSERT INTO capitales (nombre, pais_id) VALUES ('París', 2);
INSERT INTO capitales (nombre, pais_id) VALUES ('Berlín', 3);