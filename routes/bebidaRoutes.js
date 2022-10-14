const router = require('express').Router()

const { application } = require('express')
const Bebida = require('../models/Bebida')


//Post

router.post('/bebida', async (req,res) => {
    // req.body

    const {name, description, price, alcohol} = req.body

    if(!name) {
        res.status(400).json({error:'É necessario informar o nome da bebida'})
        return
    }

    if(!description) {
        res.status(400).json({error:'É necessario informar a descrição da bebida'})
        return
    }

    if(!price) {
        res.status(400).json({error:'É necessario informar o preço da bebida'})
        return
    }

   
    
    
    const bebida = {
        name, description, price, alcohol
    }
    
    try {
     
        await Bebida.create(bebida)
    
        res.status(200).json({message:'Bebida cadastrada com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })


    //Get
   router.get('/bebidas', async (req, res) => {
    try {

        const bebida = await Bebida.find()

        res.status(200).json(bebida)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //get por id

   router.get('/bebida/:id', async (req, res) => {
    
   const id = req.params.id
   
   try {
    const bebida = await Bebida.findOne({ _id: id })
    
    
    if(!bebida) {
        res.status(404).json({ message: 'A bebida informada não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(bebida)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})

//atualização de dados

router.put('/bebida/:id', async(req, res) => {
    
    const id = req.params.id

    const { name, description, price, alcohol} = req.body

    const bebida = {name, description, price, alcohol}

    try {
        const updatedBebida = await Bebida.updateOne({ _id: id }, bebida)
        
        if(updatedBebida.matchedCount === 0) {
         res.status(404).json({ message: "A bebida informada não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Bebida atualizada com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//Delete


router.delete('/bebida/:id', async (req, res) => {

    const id = req.params.id

    const bebida = await Bebida.findOne({ _id: id })
    
    if(!bebida) {
        res.status(404).json({ message: 'A bebida informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Bebida.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Bebida excluida com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})



    module.exports = router
    
    