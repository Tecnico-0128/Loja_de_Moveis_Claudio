import * as vendasService from '../services/vendasService.js'


export async function listar (req,res) {
    
const venda = await vendasService.listarvenda()
    
    return res.status(200).json(venda)

}

export async function buscarcPornome (req,res) {
const venda = await vendasService.buscarcPornome(req.params.venda)
   if(!venda){
    return res.status(404).json({Message: 'Venda não encontrada.'} )
}
    return res.status(200).json(produto)
}

export async function cadastrar (req,res)  {
    const venda = await vendasService.cadastrarvenda(req.body)
    return res.status(201).json(venda)
}
