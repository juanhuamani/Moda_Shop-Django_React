import { UserRepository } from "../repositories/users.repository.js";
import { RefreshTokenRepository } from "../repositories/refresh-token.repository.js";
import { ValidationError } from "../errors/customErrors.errors.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN } from "../config.js";

const userRepository = new UserRepository();
const refreshTokenRepository = new RefreshTokenRepository();

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await userRepository.login(email, password);
        const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN * 60 });
        const refreshToken = jwt.sign({ id: user.id, email }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN * 60 });
        
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        const refreshTokenExpiresAt = new Date(Date.now() + JWT_REFRESH_EXPIRES_IN * 60 * 1000);
        await refreshTokenRepository.saveRefreshToken(user.id, refreshToken, refreshTokenExpiresAt);

        res.status(200)
            .cookie("access_token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: JWT_EXPIRES_IN * 60 * 1000
            })
            .cookie("refresh_token", refreshToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: JWT_REFRESH_EXPIRES_IN * 60 * 1000
            })
            .json({ 
                ok: true, 
                status: 200, 
                message: "User logged in successfully", 
                user 
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const user = await userRepository.create({ first_name, last_name, email, password });
        res.status(201).json({ ok: true, status: 201, message: "User created successfully", user });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({
              ok: false,
              status: 400,
              message: error.message,
              errors: error.details || []
            });
          }
          
          console.error(error);
          res.status(500).json({
            ok: false,
            status: 500,
            message: "Internal server error"
          });
    }
}

export const logout = async (req, res) => {
    const userId = req.user.id;
    
    try{
        await refreshTokenRepository.deleteRefreshToken(userId);

        res.clearCookie('access_token')
        .clearCookie('refresh_token')
        .status(200).json({
            ok: true,
            status: 200,
            message: "User logged out successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token requerido" });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        
        const isValid = await refreshTokenRepository.validateRefreshToken(
            decoded.id, 
            refreshToken
        );

        if (!isValid) {
            return res.status(401).json({ error: "Refresh token inválido" });
        }

        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN * 60 }
        );

        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: JWT_EXPIRES_IN * 60 * 1000
        }).json({
            ok: true,
            accessToken: newAccessToken,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(401).json({ error: "Error al renovar el token" });
    }
};