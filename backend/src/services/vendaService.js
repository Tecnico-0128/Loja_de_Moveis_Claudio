import bd_venda from '../models/bd_venda.js'



export async function listarvenda() {
    return await bd_venda.findAll({ order: [['id', 'ASC']] })

}

export async function buscarcPornome(nome_produto/*nmproduto*/) {
    return await bd_produto.findAll({
        where: { nome_produto }
    })

}

export async function cadastrarvenda(dados) {
    const { nome_produto, tipo, cor, quantidade_vendida, preco } = dados
    return await bd_venda.create({ 
         nome_produto,
         tipo,
         cor,
         quantidade_vendida,
         preco 
        })

}
