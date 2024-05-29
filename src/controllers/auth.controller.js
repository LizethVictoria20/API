import { pool } from "../db.js";

export const Register = async (req, res) => {
    const {id, name, nationality, isHuman} = req.body;
    
    const [ rows ] = await pool.query('SELECT * FROM `Character` WHERE id = ? AND name = ? AND nationality = ? AND isHuman = ? ',
                                        [id, name, nationality, isHuman])
    res.send({
        id,
        name,
        nationality,
        isHuman 
    })
};

export const Login = (req, res) => res.send('Login');

