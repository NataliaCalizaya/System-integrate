import express from "express";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from './database/database.js';
import usersRoutes from "./routes/users.routes.js"
import postsRoutes from "./routes/posts.routes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
sequelize.authenticate();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));

import "./models/Post.js";
import "./models/Media.js";
import { setupAssociations } from "./models/associations.js";
setupAssociations();
await sequelize.authenticate();

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, HOST, () => {
    console.log('Server on port http://' + HOST + ":" + PORT + '/api')
}); 