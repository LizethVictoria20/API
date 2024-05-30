CREATE DATABASE IF NOT EXISTS OsitosCariñositos;

USE OsitosCariñositos;

CREATE TABLE `Ositos`(
    osito_id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(60) NOT NULL ,
    admin BOOLEAN NOT NULL, 
    rol VARCHAR(20),
    color VARCHAR(15) NOT NULL,
    email_osito VARCHAR(45) NOT NULL,
    PRIMARY KEY (osito_id)
);

CREATE TABLE `Habilidades` (
    habilidad_id INT(10) NOT NULL AUTO_INCREMENT,
    habilidad_nombre VARCHAR(20),
    habilidad_descripcion VARCHAR(45),
    habilidad_tipo VARCHAR(20),
    osito_id INT(10) NOT NULL,
    FOREIGN KEY (osito_id) REFERENCES Ositos(osito_id), 
    PRIMARY KEY (habilidad_id)
);

CREATE TABLE `Equipos` (
    equipo_id INT(10) NOT NULL AUTO_INCREMENT,
    equipo_nombre VARCHAR(20),
    lider_id INT(10),
    equipo_especialidad VARCHAR(45),
    FOREIGN KEY (lider_id) REFERENCES Ositos(osito_id),
    PRIMARY KEY (equipo_id)
);

CREATE TABLE `Misiones` (
    mision_id INT(10) NOT NULL AUTO_INCREMENT,
    mision_nombre VARCHAR(20),
    mision_descripcion VARCHAR(45),
    mision_dificultad VARCHAR(10),
    equipo_id INT(10),
    FOREIGN KEY (equipo_id) REFERENCES Equipos(equipo_id),
    PRIMARY KEY (mision_id)
);

CREATE TABLE `Osito_Equipo` (
    osito_id INT(10),
    equipo_id INT(10),
    rol VARCHAR(20),
    PRIMARY KEY (osito_id, equipo_id),
    FOREIGN KEY (osito_id) REFERENCES Ositos(osito_id),
    FOREIGN KEY (equipo_id) REFERENCES Equipos(equipo_id)
);

INSERT INTO Ositos (name,password,admin,rol,color,email_osito) 
  VALUE
    ("osito_patiño","R4PST4R",TRUE,"DIOS","NEGRO/ROJO","ositopatiño@gmail.com"),
    ("osito_liz","liz123",TRUE,"DIOS","AZUL","ositoliz@gmail.com"),
    ("osito_andres","andres123",TRUE,"DIOS","VERDE","ositoandres@gmail.com"),
    ("osito_manuel","manuel123",TRUE,"DIOS","CHOCOLATE","ositomanuel@gmail.com"),
    ("osito_luna","LUNA123",FALSE,"GUERRERO","AZUL","ositoluna@gmail.com"),
    ("osito_sombra","SOMBRA123",FALSE,"ASESINO","NEGRO","ositosombra@gmail.com"),
    ("osito_alejo","ALEJO123",FALSE,"GUERRERO","ROJO","ositoalejo@gmail.com"),
    ("osito_juan","JUAN123",FALSE,"ASESINO","VERDE","ositojuan@gmail.com");

