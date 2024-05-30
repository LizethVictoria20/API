import jwt from 'jsonwebtoken';

export const ACCESS_TOKEN_SECRET = 'your_secret_key_here'; // Define tu clave secreta aquí

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    // jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) return res.sendStatus(403);
    //     req.user = user;
    //     next();
    // });

    // decodificar el token y acceder al payload. 

    // Revisar si el rol cargado en el payload del token es admin
    
    // si es admin continuar la ejecución de la ruta next(), sino, responder un codigo de estado de no autorizado. 
};