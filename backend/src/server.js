
import express from 'express'

import cliente_routes from './routes/cliente_routes.js'
import produto_routes from './routes/produto_routes.js'

import './models/bd_cliente.js'
import './models/bd_produto.js'

const app = express()

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

app.use(express.json())

// Teste da API
app.get('/health', (req, res) => {
  res.json({
    message: 'Servidor Funcionando.',
    success: true
  })
})

// Rotas
app.use('/cliente', cliente_routes)
app.use('/produto', produto_routes)

// Exporta para a Vercel
export default app
