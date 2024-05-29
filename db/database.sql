CREATE DATABASE IF NOT EXISTS charactersJoJo;

USE charactersJoJo;

CREATE TABLE `Character`(
    ID INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    nationality VARCHAR(45),
    isHuman VARCHAR(10),
    PRIMARY KEY (ID)
);


INSERT INTO `Character` (ID, name, nationality, isHuman)
    VALUE
    (1, 'Jonathan Joestar', 'British', 'true'),
    (2, 'Dio Brando', 'British', 'false'),
    (3, 'Erina Pendleton', 'British', 'true'),
    (4, 'Will Anthonio Zeppeli', 'Italian', 'true');

SELECT * FROM `Character`;

DELETE FROM `Character`  WHERE name = 'Bruford';
