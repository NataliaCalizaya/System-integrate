import { Router } from "express";
import {
    getPostsLite,
    getPostById,
    createPost,
    changePostVerifyStatus,
} from "../controllers/posts.controllers.js";
import { upload } from "../libs/multer.js";

const router = Router();

// Rutas específicas primero
router.get("/news", getPostsLite);                  // /api/posts/news

// Detalle por ID
router.get("/:id", getPostById);                    // /api/posts/1

// Listado completo (si lo usás)
// Crear post con archivos (si corresponde)
router.post(
    "/",
    upload.fields([
        { name: "cover", maxCount: 1 },
        { name: "gallery", maxCount: 20 },
    ]),
    createPost
);

// Moderación
router.patch("/:id/verify", changePostVerifyStatus);

export default router;
