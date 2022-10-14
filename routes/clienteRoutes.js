const router = require('express').Router()

const { application } = require('express')
const Cliente = require('../models/cliente')


//Post

router.post('/cliente', async (req,res) => {
    // req.body

    const {name, cpf, email, phone} = req.body

    if(!name) {
        res.status(400).json({error:'É necessario informar o seu nome'})
        return
    }

    if(!cpf) {
        res.status(400).json({error:'É necessario informar o seu cpf'})
        return
    }

    if(!email) {
        res.status(400).json({error:'É necessario informar o seu email'})
        return
    }

    if(!phone) {
        res.status(400).json({error:'É necessario informar o seu telefone'})
        return
    }

   
    
    
    const cliente = {
        name, cpf, email, phone
    }
    
    try {
     
        await Cliente.create(cliente)
    
        res.status(200).json({message:'Cadastro efetuado com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })


    //Get
   router.get('/clientes', async (req, res) => {
    try {

        const cliente = await Cliente.find()

        res.status(200).json(cliente)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //get por id

   router.get('/cliente/:id', async (req, res) => {
    
   const id = req.params.id
   
   try {
    const cliente = await Cliente.findOne({ _id: id })
    
    
    if(!cliente) {
        res.status(404).json({ message: 'O cliente informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(cliente)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})

//atualização de dados

router.put('/cliente/:id', async(req, res) => {
    
    const id = req.params.id

    const { name, cpf, email, phone} = req.body

    const cliente = {name, cpf, email, phone}

    try {
        const updatedCliente = await Cliente.updateOne({ _id: id }, cliente)
        
        if(updatedCliente.matchedCount === 0) {
         res.status(404).json({ message: "O cliente informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Cliente atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//Delete


router.delete('/cliente/:id', async (req, res) => {

    const id = req.params.id

    const cliente = await Cliente.findOne({ _id: id })
    
    if(!cliente) {
        res.status(404).json({ message: 'O cliente informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Cliente.deleteOne({ _id: id})

        res.status(200).json ({ message: 'O cadastro do cliente foi excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})



    module.exports = router
    