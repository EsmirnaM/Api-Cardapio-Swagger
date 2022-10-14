const router = require('express').Router()

const { application } = require('express')
const Adicional = require('../models/Adicional')


//Post

router.post('/adicional', async (req,res) => {
    // req.body

    const {name, description, price, veggie} = req.body

    if(!name) {
        res.status(400).json({error:'É necessario informar o nome do adicional'})
        return
    }

    if(!description) {
        res.status(400).json({error:'É necessario informar a descrição do adicional'})
        return
    }

    if(!price) {
        res.status(400).json({error:'É necessario informar o preço do adicional'})
        return
    }

   
    
    
    const adicional = {
        name, description, price, veggie
    }
    
    try {
     
        await Adicional.create(adicional)
    
        res.status(200).json({message:'Adicional cadastrado com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })


    //Get
   router.get('/adicionais', async (req, res) => {
    try {

        const adicional = await Adicional.find()

        res.status(200).json(adicional)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //get por id

   router.get('/adicional/:id', async (req, res) => {
    
   const id = req.params.id
   
   try {
    const adicional = await Adicional.findOne({ _id: id })
    
    
    if(!adicional) {
        res.status(404).json({ message: 'Adicional informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(adicional)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})

//atualização de dados

router.put('/adicional/:id', async(req, res) => {
    
    const id = req.params.id

    const { name, description, price, veggie} = req.body

    const adicional = {name, description, price, veggie}

    try {
        const updatedAdicional = await Adicional.updateOne({ _id: id }, adicional)
        
        if(updatedAdicional.matchedCount === 0) {
         res.status(404).json({ message: "Adicional informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Adicional atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//Delete


router.delete('/adicional/:id', async (req, res) => {

    const id = req.params.id

    const adicional = await Adicional.findOne({ _id: id })
    
    if(!adicional) {
        res.status(404).json({ message: 'Adicional informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Adicional.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Adicional excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})



    module.exports = router
    