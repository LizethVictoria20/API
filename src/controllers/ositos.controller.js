import { pool } from "../db.js";



// Obteniendo todos los datos que tengo en la base de datos
export const getOsitos = async(req, res) => {
   const [ rows ] = await pool.query('SELECT * FROM Ositos')
   res.json(rows)
};

export const getOsito = async (req, res) => {
    // Obtengo el id del personaje
    console.log(req.params.id)
    const [ rows ] =  await pool.query('SELECT * FROM Ositos WHERE osito_id = ?', [req.params.id]);
    
    if(rows.length <= 0){
        return res.status(404).json({
            message: 'Osito not found'
        })
    }
    console.log(rows)   
 };


export const createOsito = async (req, res) => {
    const  {osito_id, name, password, admin, rol, color, email_osito } = req.body
    // Siempre que se hace una insercion, consulta o actualizacion con la base de datos es asinctrono
    const [ rows ] = await pool.query('INSERT INTO Ositos (osito_id, name, password, admin, rol, color, email_osito) VALUES (?, ?, ?, ?)', 
                [osito_id, name, password, admin, rol, color, email_osito])
    res.send({
        osito_id: rows.insertId, 
        name,
        password,
        admin,
        rol,
        color,
        email_osito
    })
};

export const updateOsito = (req, res) => {
    // const id = req.params.id
    const { osito_id } = req.params;
    const { name, password, admin, rol, color, email_osit } = req.body;

    console.log(osito_id, name, password, admin, rol, color, email_osit)
    res.json('received')



};

export const deleteOsito =  async (req, res) => {
   const result = await  pool.query('DELETE FROM `Character` WHERE id = ?', 
                                    [req.params.osito_id])
    if(result.affectedRows <= 0) return res.status(404).json({
            message: "Osito not found"
        })
    
    // Este codigo significa que todo se ejecutó de manera correcta pero no está esperando que retorne algo al cliente
   res.sendStatus(204);
};

