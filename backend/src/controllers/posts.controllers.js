import { Op } from "sequelize";
import { Post } from "../models/Post.js";
import { Media } from "../models/Media.js";

const parseVerify = (v, def = 1) => {
    if (v === "pending" || v === "0") return 0;
    if (v === "approved" || v === "1") return 1;
    if (v === "deleted" || v === "2") return 2;
    return def;
};

const publicUrlFromAbs = (absPath, req) => {
    const idx = absPath.replace(/\\/g, "/").indexOf("/uploads/");
    const rel = idx >= 0 ? absPath.replace(/\\/g, "/").slice(idx) : null;
    const base = `${req.protocol}://${req.get("host")}`;
    return rel ? `${base}${rel}` : null;
};

export const getPostById = async (req, res) => {
    try {
        const idNum = Number(req.params.id); // ← NO reutilizamos "id"
        if (!Number.isFinite(idNum)) {
            return res.status(400).json({ success: false, message: "ID inválido" });
        }

        const where = { id: idNum }; // ← clave literal "id"
        if (typeof req.query.verify !== "undefined") {
            where.verify_status = parseVerify(String(req.query.verify));
        }

        const post = await Post.findOne({
            where,
            include: [
                {
                    model: Media,
                    as: "media",
                    required: false,
                    attributes: ["id", "type", "provider", "url", "thumb_url", "status", "uploaded_at"], // ← todos strings
                    where: { status: { [Op.ne]: "rejected" } },
                },
            ],
            order: [
                // ordenar media si querés
                [{ model: Media, as: "media" }, "uploaded_at", "DESC"],
            ],
        });

        if (!post) {
            return res.status(404).json({ success: false, message: "Post no encontrado" });
        }

        return res.status(200).json({ success: true, message: "OK", data: post });
    } catch (err) {
        return res.status(500).json({ success: false, message: err?.message || "Error interno" });
    }
};

export const getPostsLite = async (req, res) => {
    try {
        const verify = parseVerify(req.query.verify, 1);

        const toInt = (v, def) => {
            const n = parseInt(String(v ?? ""), 10);
            return Number.isFinite(n) ? n : def;
        };
        const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

        const ctx = String(req.query.ctx ?? "news");
        const defaultLimit = ctx === "home" ? 3 : 30;

        const limit = clamp(toInt(req.query.limit, defaultLimit), 1, 100);
        const offset = Math.max(toInt(req.query.offset, 0), 0);

        const rows = await Post.findAll({
            attributes: [
                "id",
                "title",
                "description",
                "author_name",
                "cover_url",
                "published_at",
                "created_at",
            ],
            where: { verify_status: verify },
            order: [
                ["published_at", "DESC"],
                ["created_at", "DESC"],
            ],
            limit,
            offset,
        });

        const items = rows.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description ?? "",
            author_name: p.author_name ?? "Anónimo",
            cover_url: p.cover_url ?? null,
            published_at: p.published_at,
            created_at: p.created_at,
        }));

        return res.status(200).json({
            success: true,
            message: "OK",
            data: {
                posts: items,
                meta: { limit, offset, returned: items.length, verify },
            },
        });
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, message: err.message || "Error interno" });
    }
};


export const createPost = async (req, res) => {
    const t = await Post.sequelize.transaction();
    try {
        const {
            title,
            subtitle,
            description,
            caption,
            body,
            author_name,
            author_id,
            uploader_id,
            published_at,
        } = req.body || {};

        if (!title || !body) {
            return res.status(400).json({ success: false, message: "title y body son obligatorios" });
        }

        let cover_url = null;
        const coverFile = req.files?.cover?.[0];
        if (coverFile) {
            const url = publicUrlFromAbs(coverFile.path, req);
            if (url) cover_url = url;
        }

        const post = await Post.create(
            {
                title,
                subtitle,
                description,
                caption,
                body,
                author_name,
                author_id: author_id ? Number(author_id) : null,
                uploader_id: uploader_id ? Number(uploader_id) : null,
                cover_url,
                verify_status: 0,
                published_at: published_at || null,
            },
            { transaction: t }
        );

        const gallery = req.files?.gallery || [];
        if (Array.isArray(gallery) && gallery.length > 0) {
            const mediaRows = gallery.map((f) => {
                const isImage = f.mimetype.startsWith("image/");
                const url = publicUrlFromAbs(f.path, req);
                return {
                    post_id: post.id,
                    type: isImage ? "image" : "video",
                    provider: "local",
                    url,
                    thumb_url: null,
                    status: "approved",
                };
            });
            await Media.bulkCreate(mediaRows, { transaction: t });
        }

        await t.commit();

        const created = await Post.findByPk(post.id, {
            include: [
                {
                    model: Media,
                    as: "media",
                    attributes: ["id", "type", "provider", "url", "thumb_url", "status", "uploaded_at"],
                },
            ],
        });

        return res.status(201).json({
            success: true,
            message: "Post creado",
            data: created,
        });
    } catch (err) {
        await t.rollback();
        return res.status(500).json({ success: false, message: err.message || "Error al crear post" });
    }
};

export const changePostVerifyStatus = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ success: false, message: "ID inválido" });

        let newStatus = null;

        if ("verify_status" in req.body) {
            const v = Number(req.body.verify_status);
            if (v === 1 || v === 2) newStatus = v;
        } else if ("action" in req.body) {
            if (req.body.action === "approve") newStatus = 1;
            if (req.body.action === "delete") newStatus = 2;
        }

        if (newStatus === null) {
            return res.status(400).json({ success: false, message: "verify_status debe ser 1 o 2" });
        }

        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ success: false, message: "Post no encontrado" });

        if (post.verify_status !== 0) {
            return res.status(409).json({
                success: false,
                message: "Solo se puede cambiar el estado desde pendiente (0) a 1 o 2",
            });
        }

        post.verify_status = newStatus;
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Estado de verificación actualizado",
            data: { id: post.id, verify_status: post.verify_status },
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message || "Error interno" });
    }
};