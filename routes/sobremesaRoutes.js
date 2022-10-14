const router = require('express').Router()

const { application } = require('express')
const Sobremesa = require('../models/Sobremesa')


//Post

router.post('/sobremesa', async (req,res) => {
    // req.body

    const {name, description, price, light} = req.body

    
    if(!name) {
        res.status(400).json({error:'É necessario informar o nome da sobremesa'})
        return
    }

    if(!description) {
        res.status(400).json({error:'É necessario informar a descrição da sobremesa'})
        return
    }

    if(!price) {
        res.status(400).json({error:'É necessario informar o preço da sobremesa'})
        return
    }

    
    const sobremesa = {
        name, description, price, light
    }
    
    try {
     
        await Sobremesa.create(sobremesa)
    
        res.status(200).json({message:'Sobremesa cadastrada com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })


    //Get
   router.get('/sobremesas', async (req, res) => {
    try {

        const sobremesa = await Sobremesa.find()

        res.status(200).json(sobremesa)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //get por id

   router.get('/sobremesa/:id', async (req, res) => {
    
   const id = req.params.id
   
   try {
    const sobremesa = await Sobremesa.findOne({ _id: id })
    
    
    if(!sobremesa) {
        res.status(404).json({ message: 'A sobremesa informada não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(sobremesa)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})

//atualização de dados

router.put('/sobremesa/:id', async(req, res) => {
    
    const id = req.params.id

    const { name, description, price, light} = req.body

    const sobremesa = {name, description, price, light}

    try {
        const updatedSobremesa = await Sobremesa.updateOne({ _id: id }, sobremesa)
        
        if(updatedSobremesa.matchedCount === 0) {
         res.status(404).json({ message: "A sobremesa informada não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Sobremesa atualizada com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//Delete


router.delete('/sobremesa/:id', async (req, res) => {

    const id = req.params.id

    const sobremesa = await Sobremesa.findOne({ _id: id })
    
    if(!sobremesa) {
        res.status(404).json({ message: 'A sobremesa informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Sobremesa.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Sobremesa excluida com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})



    module.exports = router
    