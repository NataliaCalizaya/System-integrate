import bcrypt from "bcryptjs";
import { Users } from "../models/Users.js";

export const createUser = async (req, res) => {
    try {
        const { name, username, role, password } = req.body || {};

        if (!name || !username || !role || !password) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos obligatorios (name, username, role, password)",
            });
        }

        const exists = await Users.findOne({ where: { username } });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "El nombre de usuario ya está en uso",
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await Users.create({
            name: String(name).trim(),
            username: String(username).trim(),
            role,
            password: passwordHash,
        });

        return res.status(201).json({
            success: true,
            message: "Usuario creado correctamente",
            data: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body || {};

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Faltan credenciales (username, password)",
            });
        }

        const user = await Users.findOne({ where: { username: String(username).trim() } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Credenciales inválidas",
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Credenciales inválidas",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login exitoso",
            data: {
                user: { id: user.id, name: user.name, role: user.role },
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
        });
    }
};