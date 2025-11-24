import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },

    name: { type: DataTypes.STRING, allowNull: false },

    username: { type: DataTypes.STRING, allowNull: false },

    role: { type: DataTypes.STRING, allowNull: false },

    password: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false })