//Configuração inicial do nosso api!

const express = require('express')
const mongoose = require('mongoose')
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')


const app = express();




app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));





//Ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())



//Requisição cliente-----------------------------------------
const clienteRoutes = require('./routes/clienteRoutes')


app.use('/', clienteRoutes)

//Requisição prato------------------------------------------
const pratoRoutes = require('./routes/pratoRoutes')


app.use('/', pratoRoutes)


//Requisição bebida-----------------------------------------

const bebidaRoutes = require('./routes/bebidaRoutes')


app.use('/', bebidaRoutes)


//Requisicao sobremesa--------------------------------------

const sobremesaRoutes = require('./routes/sobremesaRoutes')


app.use('/', sobremesaRoutes)



//Requisicao adicional--------------------------------------

const adicionalRoutes = require('./routes/adicionalRoutes')


app.use('/', adicionalRoutes)


//Requisicao pedido

const pedidoRoutes = require('./routes/pedidoRoutes')


app.use('/', pedidoRoutes)



//post


//Requisição inicial
app.get('/', (req,res)=>{

    res.json({message: 'Olá Toti'})

})

const DB_USUARIO = 'grupocardapio'
const DB_SENHA = encodeURIComponent('cardapio') 

mongoose.connect(
        `mongodb+srv://${DB_USUARIO}:${DB_SENHA}@apicardapio.dqx2tvc.mongodb.net/?retryWrites=true&w=majority`,
    )
.then(()=> {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000) 
})
.catch((err)=> console.log(err))


