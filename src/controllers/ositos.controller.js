import { pool } from "../db.js";
import bcrypt from 'bcryptjs';
import Joi from 'joi';


// Esquema de validación con Joi para los datos de los ositos
const ositoSchema = Joi.object({
    osito_id: Joi.number().optional(),
    name: Joi.string().required(),
    password: Joi.string().min(5).regex(/(?=.*[0-9])(?=.*[A-Z])/).required(),
    admin: Joi.boolean().required(),
    rol: Joi.string().required(),
    color: Joi.string().required(),
    email_osito: Joi.string().email().required()
});

// Obtener todos los ositos de la base de datos
export const getOsitos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ositos');
        res.json(rows); // Enviar los datos obtenidos como respuesta en formato JSON
    } catch (error) {
        res.status(500).json({ message: 'Error recuperando osito', error }); // Manejo de errores
    }
};

// Obtener un osito específico por su ID
export const getOsito = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ositos WHERE osito_id = ?', [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Osito no encontrado :c' }); // Si no se encuentra el osito, enviar un error 404
        }
        res.json(rows[0]); // Enviar el osito encontrado como respuesta
    } catch (error) {
        res.status(500).json({ message: 'Error recuperando osito}', error }); // Manejo de errores
    }
};

// Crear un nuevo osito en la base de datos
export const createOsito = async (req, res) => {
    try {
        // Validar los datos del cuerpo de la solicitud usando Joi
        const { error, value } = ositoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Indormacion Incorrecta bobo', error: error.details[0].message }); // Si los datos no son válidos, enviar un error 400
        }

        const { name, password, admin, rol, color, email_osito } = value;

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
        res.status(500).json({ message: 'Error creando oso', error }); // Manejo de errores
    }
};



// Actualizar un osito existente en la base de datos
export const updateOsito = async (req, res) => {
    try {
        // Validar los datos del cuerpo de la solicitud usando Joi
        const { error, value } = ositoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Informacion Invalida Bobo', error: error.details[0].message }); // Si los datos no son válidos, enviar un error 400
        }

        const { name, password, admin, rol, color, email_osito } = value;

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar los datos del osito en la base de datos
        const [result] = await pool.query(
            'UPDATE ositos SET name = ?, password = ?, admin = ?, rol = ?, color = ?, email_osito = ? WHERE osito_id = ?',
            [name, hashedPassword, admin, rol, color, email_osito, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Osito no encontrado' }); // Si no se encuentra el osito, enviar un error 404
        }

        res.json({ message: 'Osito actualizado correctamente' }); // Enviar una respuesta exitosa
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando osito', error }); // Manejo de errores
    }
};

// Eliminar un osito de la base de datos
export const deleteOsito = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM ositos WHERE osito_id = ?', [req.params.id]);
        
        if (result.affectedRows > 0){
            res.Status(204).json({ message: 'osito eliminado con exito'}); // Enviar una respuesta exitosa sin contenido
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Osito no encontrado' }); // Si no se encuentra el osito, enviar un error 404
        }
    } catch (error) {
        res.status(500).json({ message: 'Error borrando osito', error }); // Manejo de errores
    }
};
