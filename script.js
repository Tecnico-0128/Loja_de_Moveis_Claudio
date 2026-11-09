const dadosc = document.getElementById("dadosc")
const nomec = document.getElementById("nomec")
const cpf = document.getElementById("cpf")
const rua = document.getElementById("rua")
const numero = document.getElementById("numero")
const uf = document.getElementById("uf")
const clientes = JSON.parse(localStorage.getItem("clientes")) || []

const dadosp = document.getElementById("dadosp")
const nomep = document.getElementById("nomep")
const tipo = document.getElementById("tipo")
const cor = document.getElementById("cor")
const preco = document.getElementById("preco")
const quantidade = document.getElementById("quantidade")
const produtos = JSON.parse(localStorage.getItem("produtos")) || []

const cpfbuscarcliente = document.getElementById("cpfbuscarcliente")
const nomebuscarcliente = document.getElementById("nomebuscarcliente")
const ruabuscarcliente = document.getElementById("ruabuscarcliente")
const numerobuscarcliente = document.getElementById("numerobuscarcliente")
const ufbuscarcliente = document.getElementById("ufbuscarcliente")

const nomebuscarproduto = document.getElementById("nomebuscarproduto")
const tipobuscarproduto = document.getElementById("tipobuscarproduto")
const corbuscarproduto = document.getElementById("corbuscarproduto")
const precobuscarproduto = document.getElementById("precobuscarproduto")
const quantidadebuscarproduto = document.getElementById("quantidadebuscarproduto")

const prov = document.getElementById("prov")
const estv = document.getElementById("estv")
const vuv = document.getElementById("vuv")
const quav = document.getElementById("quav")
const totalv = document.getElementById("totalv")
const cpfv = document.getElementById("cpfv")
const nomev = document.getElementById("nomev")

const vendas = JSON.parse(localStorage.getItem("vendas")) || []
const nomecv = document.getElementById("nomecv")
const quantidadecv = document.getElementById("quantidadecv")


async function cli() {
  if (nomec.value.trim() && cpf.value.trim() && rua.value.trim() && numero.value.trim() && uf.value.trim) {
    if (/^[A-Za-zÁ-ý\s]+$/.test(nomec.value)) {
      if (/^\d{11}$/.test(cpf.value)) {
        let existe = false
        for (let cliente of clientes) {
          if (cliente.cpf == cpf.value)
            existe = true
        }
        if (!existe) {
          const cliente = {
            nome: nomec.value,
            cpf: cpf.value,
            rua: rua.value,
            numero: numero.value,
            uf: uf.value
          }
          clientes.push(cliente)
          await fetch('http://localhost:3000/cliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
          })

          localStorage.setItem("clientes", JSON.stringify(clientes))
          alert("Cliente Cadastrado com sucesso!")


        } else alert("Cliente Já Cadastrado!")

      } else alert("deve conter apenas 11 digitos caso for CPF ou 14 digitos caso for CNPJ")

    } else alert("Nome so Aceita Letras , acentos e Espaço!")

  } else alert("Preencha todos os campos!")
}

async function pro() {
  if (nomep.value.trim() && tipo.value.trim() && cor.value.trim() && preco.value.trim() && quantidade.value.trim()) {
    if (preco.value > 0) {
      if (quantidade.value >= 0) {

        let existe = false
        for (let p of produtos) {
          if (p.nomepr == nomep.value)
            existe = true
        }
        if (!existe) {
          const produto = {
            nomepr: nomep.value,
            tipo: tipo.value,
            cor: cor.value,
            preco: preco.value,
            quantidade: quantidade.value
          }
          produtos.push(produto)
          await fetch('http://localhost:3000/produto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
          })

          localStorage.setItem("produtos", JSON.stringify(produtos))
          alert("Produto Cadastrado com sucesso!")
          listarp()

        } else alert("Produto ja Cadastrado!")

      } else alert("Quantidade não pode ser negativa")

    } else alert("Valor não pode ser 0 ou negativo")

  } else alert("Preencha todos os campos do produto")

}

function buscliente() {
  let existe = false
  let cliente
  for (let c of clientes) {
    if (c.cpfoucnpj == cpfbuscarcliente.value) {
      cliente = c
      existe = true
    }

  }
  if (existe) {


    nomebuscarcliente.value = cliente.nome
    ruabuscarcliente.value = cliente.rua
    numerobuscarcliente.value = cliente.numero
    ufbuscarcliente.value = cliente.uf


    listarc()

  } else alert("Cliente Não encontrado")


}

function editcliente() {

  let existe = false
  let cliente = -1
  for (let c of clientes) {
    cliente++
    if (c.cpfoucnpj == cpfbuscarcliente.value) {
      existe = true
      break
    }
  }
  if (existe) {
    clientes[cliente].nome = nomebuscarcliente.value
    clientes[cliente].rua = ruabuscarcliente.value
    clientes[cliente].numero = numerobuscarcliente.value
    clientes[cliente].uf = ufbuscarcliente.value
    localStorage.setItem("clientes", JSON.stringify(clientes))
    listarc()
    alert("Cliente Editado com sucesso!")
    editar_cliente()

  }


}

function excluircliente() {
  alert("ddd")
  let existe = false
  let cliente = -1
  for (let c of clientes) {
    cliente++
    if (c.cpf == cpfbuscarcliente.value) {
      existe = true
      break
    }
  }
  if (existe) {
    clientes.splice(cliente, 1)
    localStorage.setItem("clientes", JSON.stringify(clientes))
    alert("Cliente Deletado com sucesso!")
    listarc()
  } else alert("Cliente Não encontrado")


}

function buspv() {
  console.log("aa")
  let existe = false
  let produto
  for (let p of produtos) {
    console.log("bb")
    if (p.nomepr == prov.value) {
      produto = p
      existe = true
    }

  }
  if (existe) {
    estv.value = produto.quantidade
    vuv.value = produto.preco

  } else alert("Produto Não encontrado")



}

function buscv() {
  let existe = false
  let cliente
  for (let c of clientes) {
    if (c.cpf == cpfv.value) {
      cliente = c
      existe = true
    }

  }
  if (existe) {
    nomev.value = cliente.nome

  } else alert("Cliente Não encontrado")


}

function comprapd() {
  let existe = false
  let vlrsoma = Number(quantidadecv.value)
  let qtd_novo = 0
  if (vlrsoma > 0) {
    for (let produto of produtos) {
      if (produto.nomepr === nomecv.value) {
        existe = true
        produto.quantidade = Number(produto.quantidade) + vlrsoma
        qtd_novo = produto.quantidade
        break
      }
    }
    if (existe) {
      localStorage.setItem("produtos", JSON.stringify(produtos))
      alert("Compra Executada!! Novo Estoque: " + qtd_novo)
      listarp()
    } else {
      alert("Produto não encontrado!")
    }
  } else {
    alert("Impossível Comprar Valor negativo!!")
  }
}



function venderpd() {
  let existe = false;
  let produto;
  let vlrsoma = Number(quantidadecv.value);
  if (vlrsoma > 0) {
    for (let p of produtos) {
      if (p.nomepr === nomecv.value) {
        produto = p;
        existe = true;
        break;
      }
    }
    if (existe) {
      if (Number(produto.quantidade) >= vlrsoma) {
        produto.quantidade = Number(produto.quantidade) - vlrsoma;
        const venda = {
          nomeProduto: produto.nomepr,
          quantidade: vlrsoma,
          precoUnitario: Number(produto.preco),
          total: Number(produto.preco) * vlrsoma
        };
        vendas.push(venda);
        localStorage.setItem("vendas", JSON.stringify(vendas));
        localStorage.setItem("produtos", JSON.stringify(produtos));
        alert("Venda realizada! Novo estoque: " + produto.quantidade);
        listarp();
      } else {
        alert("Quantidade indisponível para venda!");
      }
    } else {
      alert("Produto não encontrado!");
    }
  } else {
    alert("Informe uma quantidade maior que zero!");
  }
}



function listarc() {
  dadosc.innerHTML = "Clientes Cadastrados:"

  for (let cliente of clientes) {
    dadosc.innerHTML += `<p>Nome: ${cliente.nome}| CPF: ${cliente.cpf} |Rua: ${cliente.rua}|Numero: ${cliente.numero}|UF: ${cliente.uf}</p> `
  }

}


function listarp() {
  dadosp.innerHTML = "Produtos Cadastrados:"

  for (let produto of produtos) {
    dadosp.innerHTML += `<p>Nome: ${produto.nomepr}| tipo: ${produto.tipo} |Cor: ${produto.cor}|Preço: ${produto.preco}|Quantidade: ${produto.quantidade}</p> `
  }

}

function telas() {
  if (nomec) {
    listarc()
  }
  if (nomep) {
    listarp()
  }
  if (dadosp) {
    listarp()
  }
}

telas()


async function buscar_cliente() {
  const busca = await fetch("http://localhost:3000/cliente")
  const dados = await busca.json()
  clientes.length  = 0
  clientes.push(...dados)
  listar_cliente()
}

async function editar_cliente() {
  const c = await clientes.find(item=>item.cpfoucnpj === cpfbuscarcliente.value)
  if (c) {
    let cliente_atualizado = {
      nome: nomebuscarcliente.value,
     rua: ruabuscarcliente.value,
    numero: numerobuscarcliente.value,
     uf: ufbuscarcliente.value
    }
    let resposta = await fetch(
      `http://localhost:3000/cliente/${c.cpfoucnpj}`,{
        method:"PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(cliente_atualizado)
  })
  }
}

async function deletar_clientes() {
  const c = await clientes.find(item=>item.cpfoucnpj === cpfbuscarcliente.value)
  if (c) {
   
    let resposta = await fetch(
      `http://localhost:3000/cliente/${c.cpfoucnpj}`,{
        method:"DELETE",
  })
  }

}

function listar_cliente() {
  div_cli.innerHTML = "<h2>Clientes Cadastrados</h2>"
  for (let c of clientes)
    div_cli.innerHTML += `<p>Nome: ${c.nome}| CPF: ${c.cpfoucnpj} |Endereço: ${c.rua}|Numero: ${c.numero}|UF: ${c.uf}</p> `
}
buscar_cliente()




async function buscar_produto() {
  const busca = await fetch("http://localhost:3000/produto")
  const dados = await busca.json()
  produtos.length  = 0
  produtos.push(...dados)
  listar_produto()
}

function listar_produto() {
  div_pro.innerHTML = "<h2>Produtos</h2>"
  for (let p of produtos)
    div_pro.innerHTML += `<p>Produto: ${p.produto}| Tipo: ${p.tipo} |Cor: ${p.cor}|Quantidade: ${p.quantidade}|Preço: ${p.preco}</p> `
}
 buscar_produto()

 async function comprar_produto() {
  let valor = Number(quantidadecv.value)
    const p = await produtos.find(item=>item.produto === nomecv.value)
  if (p) {
    const produto_comprado = {
            produto: p.nomepr,
            quantidade:Number(p.quantidade)+ valor
          }
    let resposta = await fetch(
      `http://localhost:3000/produto/${p.produto}`,{
        method:"PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(produto_comprado)
        
  })
  }
}

async function vender_produto() {
  let valor = Number(quantidadecv.value)
    const p = await produtos.find(item=>item.produto === nomecv.value)
  if (p) {
    const produto_vendido = {
            produto: p.nomepr,
            quantidade:Number(p.quantidade)- valor
          }
    let resposta = await fetch(
      `http://localhost:3000/produto/${p.produto}`,{
        method:"PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(produto_vendido)
        
  })
  }
}

async function deletar_produto() {
  const p = await produtos.find(item=>item.produto === nomecv.value)
  if (p) {
   
    let resposta = await fetch(
      `http://localhost:3000/produto/${p.produto}`,{
        method:"DELETE",
  })
  }

}