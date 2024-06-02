// Se usa createPool porque crea un conjunto de conexiones
import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'JmHurtadoIs12*',
    port: 3306,
    database: 'OsitosCariñositos'
})

