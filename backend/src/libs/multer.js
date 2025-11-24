import multer from "multer";
import path from "path";
import fs from "fs";

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");

        const isImage = file.mimetype.startsWith("image/");
        const sub = isImage ? "images" : "videos";

        const dest = path.join(process.cwd(), "uploads", "processed", sub, String(y), m);
        ensureDir(dest);
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const ts = Date.now();
        const rand = Math.floor(Math.random() * 1e9);
        const ext = path.extname(file.originalname) || "";
        cb(null, `${ts}-${rand}${ext}`);
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    fileFilter: (req, file, cb) => {
        const ok =
            file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/");
        if (!ok) return cb(new Error("Tipo de archivo no soportado"));
        cb(null, true);
    },
});