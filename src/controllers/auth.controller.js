import { pool } from "../db.js";
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

// Esquema de validación para el registro de ositos
const ositoSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(5).regex(/(?=.*[0-9])(?=.*[A-Z])/).required(),
    admin: Joi.boolean().required(),
    rol: Joi.string().required(),
    color: Joi.string().required(),
    email_osito: Joi.string().email().required()
});

// Esquema de validación para el login
const loginSchema = Joi.object({
    email_osito: Joi.string().email().required(),
    password: Joi.string().required()
});

// Obtener un usuario por email
const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM ositos WHERE email_osito = ?', [email]);
    return rows[0];
};

// Registrar un nuevo osito
export const Register = async (req, res) => {
    try {
        // Validar los datos del cuerpo de la solicitud usando Joi
        const { error, value } = ositoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Información incorrecta', error: error.details[0].message });
        }

        const { name, password, admin, rol, color, email_osito } = value;

        // Verificar si el email ya está registrado
        const existingUser = await getUserByEmail(email_osito);
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo osito en la base de datos
        const [result] = await pool.query(
            'INSERT INTO ositos (name, password, admin, rol, color, email_osito) VALUES (?, ?, ?, ?, ?, ?)',
            [name, hashedPassword, admin, rol, color, email_osito]
        );

        // Enviar una respuesta exitosa con los datos del nuevo osito
        res.status(201).json({
            osito_id: result.insertId,
            name,
            admin,
            rol,
            color,
            email_osito
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creando osito', error });
    }
};

// Iniciar sesión (Login)
export const Login = async (req, res) => {
    try {
        // Validar los datos del cuerpo de la solicitud usando Joi
        const { email_osito, password } = await loginSchema.validateAsync(req.body);

        // Obtener el usuario por email
        const user = await getUserByEmail(email_osito);
        if (!user) {
            return res.status(400).json({ message: 'Email o contraseña inválidos' });
        }

        // Verificar si la contraseña es correcta
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Email o contraseña inválidos' });
        }

        // Crear el token JWT
        const userForToken = { osito_id: user.osito_id, name: user.name, admin: user.admin };
        const accessToken = jwt.sign(userForToken, 'your_access_token_secret', { expiresIn: '1h' });

        // Enviar el token al cliente
        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({ message: 'Error en el login', error: error.message });
    }
};
