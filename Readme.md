# Correcciones Grupo 2

## Diseño de la base de datos
- En las tablas `Habilidades`, `Misiones` y `Equipos`, hay una coma extra después de la definición de la clave foránea (FOREIGN KEY). Deberías eliminar esas comas.
- La tabla `Equipos` se referencia en la tabla `Misiones` antes de que se cree. Deberías mover la creación de la tabla `Equipos` antes de la creación de la tabla `Misiones`.

## Conexión Con la base de datos
- Si bien la conexión se hace de una forma correcta:
```` javascript

// Se usa createPool porque crea un conjunto de conexiones
import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '5826',
    port: 3306,
    database: 'OsitosCariniositos'
})


````
- Se sugiere que usen variables de entorno para proteger la información sensible como el host, el usuario, la contraseña y el nombre de la base de datos. Las variables de entorno son una excelente manera de proteger la información sensible y de configurar diferentes entornos (por ejemplo, desarrollo, pruebas, producción).

- Es buena practica coprobar la conexión de la base de datos, aquí un ejemplo de como prodría ser:

    ```` javascript

    pool.connect((err)=>{
        if(err){
            console.error("No se pudo conectar con la base de datos," + err);
            return;
        }
        console.log("conexión exitosa.")
    })

    ````

## Register, Login y Logout

```` javascript 
import { Router } from "express";
import { Register, Login } from "../controllers/auth.controller.js";

// Nos permite hacer uso de peticiones
const router = Router();

router.post('/register', Register);
router.post('/login', Login);


export default router;

````
Si bien las rutas estan presentes, el proyecto carece del controlador `../controllers/auth.controller.js`.

- Recordar que no solo es register y login, tambien es `Logout`

## Esquemas y Modelos

El proyecto actualmente no cuenta con esquemas ni con modelos. Los esquemas son necesarios para validar los datos de entrada y garantizar que cumplen con las especificaciones requeridas. Por otro lado, los modelos son fundamentales para definir la estructura de los datos en nuestra base de datos.

## Middleware
Carece de Middleware que validen la `autentificación`  y `autorización` para la protección de rutas.



