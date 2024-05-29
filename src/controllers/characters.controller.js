import { pool } from "../db.js";



// Obteniendo todos los datos que tengo en la base de datos
export const getCharacters = async(req, res) => {
   const [ rows ] = await pool.query('SELECT * FROM `Character`')
   res.json(rows)
};

export const getCharacter = async (req, res) => {
    // Obtengo el id del personaje
    console.log(req.params.id)
    const [ rows ] =  await pool.query('SELECT * FROM `Character` WHERE id = ?', [req.params.id]);
    
    if(rows.length <= 0){
        return res.status(404).json({
            message: 'Character not found'
        })
    }
    console.log(rows)   
 };


export const createCharacter = async (req, res) => {
    const  { name, nationality, isHuman } = req.body
    // Siempre que se hace una insercion, consulta o actualizacion con la base de datos es asinctrono
    const [ rows ] = await pool.query('INSERT INTO `Character` (id, name, nationality, isHuman) VALUES (?, ?, ?, ?)', 
                [id, name, nationality, isHuman])
    res.send({
        id: rows.insertId, 
        name,
        nationality,
        isHuman
    })
};

export const updateCharacter = (req, res) => {
    // const id = req.params.id
    const { id } = req.params;
    const { name, isHuman } = req.body;

    console.log(id, name, isHuman)
    res.json('received')



};

export const deleleCharacter =  async (req, res) => {
   const result = await  pool.query('DELETE FROM `Character` WHERE id = ?', 
                                    [req.params.id])
    if(result.affectedRows <= 0) return res.status(404).json({
            message: "Character not found"
        })
    
    // Este codigo significa que todo se ejecutó de manera correcta pero no está esperando que retorne algo al cliente
   res.sendStatus(204);
};

