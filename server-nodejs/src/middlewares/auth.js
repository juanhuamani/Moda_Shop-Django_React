import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

/**
 * Middleware to authenticate users using JWT.
 * It checks for the presence of an access token in the cookies,
 * verifies it, and attaches the user information to the request object.
 * If the token is missing or invalid, it returns a 401 Unauthorized response.
 *  
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
*/


export const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    
    if (!accessToken) {
        return res.status(401).json({ error: "Acceso no autorizado" });
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        req.user = decoded; 
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expirado" });
        }
        return res.status(401).json({ error: "Token inválido" });
    }
};