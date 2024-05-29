import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    const {id, name, nationality, isHuman} = req.body;
    const [ rows ] = await pool.query('SELECT * FROM `Character` WHERE id = ? AND name = ? AND nationality = ? AND isHuman = ? ',
                                        [id, name, nationality, isHuman])
    const data = req.body
    const newToken = jwt.sign({ data }, 'secret_key', { expiresIn: '1h' });
            
    res.json({
        token: newToken
    });
};

export const Login = (req, res) => res.send('Login');

