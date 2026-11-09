import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const cad_produto = sequelize.define('venda', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'vendas'
})

export default cad_produto