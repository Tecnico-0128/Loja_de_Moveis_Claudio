import bd_produto from '../models/bd_produto.js'

export async function listarvenda() {
    return await bd_venda.findAll({ order: [['id', 'ASC']] })
}

export async function buscarPorNome(nomeProduto) {
    return await bd_venda.findOne({
        where: {
            produto: nomeProduto
        }
    })
}

// Mantém compatibilidade com chamadas anteriores
export const buscarcPorId = buscarPorNome
export const buscarPorId = buscarPorNome

export async function cadastrarvenda(dados) {
    const { produto, quantidade } = dados
    return await bd_venda.create({ produto, quantidade })
}

export async function removervenda(nomeProduto) {
    const vendaEncontrado = await buscarPorproduto(nomeProduto)
    if (vendaEncontrado) {
        await produtoEncontrado.destroy()
        return produtoEncontrado
    }
    return null
}


export async function venderproduto(nomeProduto, qtdvendida) {
    const produtoEncontrado = await buscarPorNome(nomeProduto)
    if (!produtoEncontrado) {
        return null
    }

    const qtd = Number(qtdvendida)
    if (isNaN(qtd) || qtd <= 0) {
        return { erro: 'Quantidade para venda deve ser um número maior que zero.' }
    }

    if (produtoEncontrado.quantidade < qtd) {
        return { erro: `Quantidade indisponível em estoque. Estoque atual: ${produtoEncontrado.quantidade}.` }
    }

    const novaqtd = Number(produtoEncontrado.quantidade) - qtd
    await produtoEncontrado.update({ quantidade: novaqtd })
    return produtoEncontrado
}

export async function comprarproduto(nomeProduto, qtdcomprada) {
    const produtoEncontrado = await buscarPorNome(nomeProduto)
    if (!produtoEncontrado) {
        return null
    }

    const qtd = Number(qtdcomprada)
    if (isNaN(qtd) || qtd <= 0) {
        return { erro: 'Quantidade para compra deve ser um número maior que zero.' }
    }

    const novaqtd = Number(produtoEncontrado.quantidade) + qtd
    await produtoEncontrado.update({ quantidade: novaqtd })
    return produtoEncontrado
}
