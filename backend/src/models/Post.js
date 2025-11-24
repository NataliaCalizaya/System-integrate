import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Post = sequelize.define("posts", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    title: { type: DataTypes.STRING, allowNull: false },
    subtitle: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    caption: { type: DataTypes.STRING },
    body: { type: DataTypes.TEXT, allowNull: false },

    verify_status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0, // pendiente
        comment: "0=pending, 1=approved, 2=deleted",
    },

    author_name: { type: DataTypes.STRING },
    author_id: { type: DataTypes.INTEGER },
    uploader_id: { type: DataTypes.INTEGER },

    cover_url: { type: DataTypes.STRING },

    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    published_at: { type: DataTypes.DATE },
}, { timestamps: false, });
