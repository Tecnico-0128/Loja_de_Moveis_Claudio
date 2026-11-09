import * as vendaService from '../services/vendaService.js'

export async function listar(req, res) {
    try {
        const vendas = await vendaService.listarvenda()
        return res.status(200).json(vendas)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao listar vendas.', erro: erro.message })
    }
}

export async function buscarPorNome(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id
        const venda = await vendaService.buscarPorNome(nomeProduto)
        if (!venda) {
            return res.status(404).json({ Message: 'A venda não foi encontrado.' })
        }
        return res.status(200).json(venda)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao buscar Venda.', erro: erro.message })
    }
}



export async function cadastrar(req, res) {
    try {
        // Aceita tanto 'produto' quanto 'nome' ou 'nomep'
        const nomeProduto = req.body.produto || req.body.nome || req.body.nomep|| req.body.nomepr
        const quantidade = req.body.quantidade !== undefined ? Number(req.body.quantidade) : undefined
        if (!nomeProduto || quantidade === undefined || isNaN(quantidade) ) {
            return res.status(400).json({ Message: 'Os campos produto e quantidade  são obrigatórios.' })
        }

        const novaVenda = await vendaService.cadastrarvenda({
            produto: nomeProduto,
            quantidade:quantidade
        })
        return res.status(201).json(novaVenda)
    } catch (erro) {
        return res.status(400).json({ Message: 'Erro ao realizar venda.', erro: erro.message })
    }
}

export async function remover(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id
        const vendaRemovido = await vendaService.removerproduto(nomeProduto)
        if (!vendaRemovido) {
            return res.status(404).json({ Message: 'Venda não foi encontrado.' })
        }
        return res.status(200).json({ Message: 'Produto removido com sucesso.', produto: produtoRemovido })
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao remover produto.', erro: erro.message })
    }
}


export async function vender(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id || req.body.nome || req.body.produto || req.body.nomecv
        const quantidade = Number(req.body.quantidade !== undefined ? req.body.quantidade : req.body.quantidadecv)

        if (isNaN(quantidade) || quantidade <= 0) {
            return res.status(400).json({ Message: 'A quantidade deve ser um número maior que zero.' })
        }

        const resultado = await produtoService.venderproduto(nomeProduto, quantidade)
        if (!resultado) {
            return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
        }
        if (resultado.erro) {
            return res.status(400).json({ Message: resultado.erro })
        }
        return res.status(200).json(resultado)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao realizar venda.', erro: erro.message })
    }
}

export async function comprar(req, res) {
    try {
        const nomeProduto = req.params.produto || req.params.nome || req.params.id || req.body.nome || req.body.produto || req.body.nomecv
        const quantidade = Number(req.body.quantidade !== undefined ? req.body.quantidade : req.body.quantidadecv)

        if (isNaN(quantidade) || quantidade <= 0) {
            return res.status(400).json({ Message: 'A quantidade deve ser um número maior que zero.' })
        }

        const resultado = await produtoService.comprarproduto(nomeProduto, quantidade)
        if (!resultado) {
            return res.status(404).json({ Message: 'O Produto não foi encontrado.' })
        }
        if (resultado.erro) {
            return res.status(400).json({ Message: resultado.erro })
        }
        return res.status(200).json(resultado)
    } catch (erro) {
        return res.status(500).json({ Message: 'Erro ao realizar compra.', erro: erro.message })
    }
}
