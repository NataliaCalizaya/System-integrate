import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Post } from "./Post.js";

export const Media = sequelize.define("media", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: { type: DataTypes.INTEGER, allowNull: false },

    type: {
        type: DataTypes.ENUM("image", "video", "youtube"),
        allowNull: false,
        defaultValue: "image",
    },

    url: { type: DataTypes.STRING, allowNull: false },
    thumb_url: { type: DataTypes.STRING },
    provider: {
        type: DataTypes.ENUM("local", "external", "youtube"),
        allowNull: false,
        defaultValue: "local",
    },

    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "approved",
    },

    uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},
    { timestamps: false }
);