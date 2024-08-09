import { DB_SECRET_KEY } from './config/config.js';
import jwt from 'jsonwebtoken';


// Funcion para verificar el token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó token' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    jwt.verify(token, DB_SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' });
            }
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
  };


// Funcion para verificar si el usuario es admin
export const isAdmin = (req, res, next) => {
    console.log('req.user:', req.user);
    console.log('req.user.rol:', req.user.rol);
    if (req.user && req.user.rol === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
  };