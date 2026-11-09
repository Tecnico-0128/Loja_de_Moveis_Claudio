 import { fileURLToPath } from 'node:url'
 import Sequelize from 'sequelize'

const caminho = fileURLToPath(
    new URL('../../database/banco.sqlite', import.meta.url)
    
)

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: caminho,
    logging: false
})

export default sequelize