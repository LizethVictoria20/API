import { pool } from "../db.js";



export const Register = async (req, res) => {


    const {osito_id, name, password, admin, rol, color,email_osito} = req.body;
    const [ rows ] = await pool.query('SELECT * FROM `ositos` WHERE osito_id = ? name = ? password = ? admin = ? rol = ? color = ? email_osito = ?', [osito_id, name, password, admin, rol, color,email_osito]);

    if(!name || !password || !admin || !rol || !color || !email_osito) {
        res.status(404).send('Información incompleta.')
    }

    const usuarioCreado = await pool.query(
        'INSERT INTO ositos (password, admin, rol, color, email_osito) VALUES (?, ?, ?, ?, ?, ?)',
        [name, password, admin, rol, color, email_osito]
      );
   res.status(201).send('Usuario creado.')
   console.log(usuarioCreado)

   //const usuarioActualiza

};

export const Login = (req, res) => res.send('Login');