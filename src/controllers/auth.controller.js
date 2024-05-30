import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    const {osito_id, name, password, admin, rol, color, email_osito} = req.body;
        const [ rows ] = await pool.query('SELECT * FROM Ositos WHERE osito_id = ? AND name = ? AND password = ? AND  admin = ? AND rol = ? AND color = ? AND email_osito = ? ',
                                            [osito_id, name, password, admin, rol, color, email_osito])
        

        if(!name || !password || !admin || !rol || !color || !email_osito) {
            res.status(404).send('Información incompleta.')
        }

        const usuarioCreado = await pool.query(
            'INSERT INTO Ositos (osito_id, name, password, admin, rol, color, email_osito) VALUES (?, ?, ?, ?)',
            [osito_id, name, password, admin, rol, color, email_osito]
          );
       res.status(201).send('Usuario creado.')
       console.log(usuarioCreado)


    };

export const Login = (req, res) => res.send('Login');

