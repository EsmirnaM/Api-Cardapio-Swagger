const router = require('express').Router()

const { application } = require('express')
const Combo = require('../models/Combo')
const Prato = require('../models/Prato')
const Bebida = require('../models/Bebida')
const Sobremesa = require('../models/Sobremesa')
const Adicional = require('../models/Adicional')




//Post

router.post('/combo', async (req,res) => {
    // req.body

    const {name, description, price, veggie, prato, bebida, sobremesa, adicional} = req.body

 
    
    const combo = {
        name, description, price, veggie, prato, bebida, sobremesa, adicional
    }
    
    try {
//validação prato
        const prato1 = await Prato.findOne({ _id: prato })
        
    
        if(!prato1) {
            res.status(404).json({ message: 'O prato informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


//validação bebida
        const bebida1 = await Bebida.findOne({ _id: bebida })
        console.log(bebida1)
    
        if(!bebida1) {
            res.status(404).json({ message: 'A bebida informada não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        } 
        

//validação sobremesa
        const sobremesa1 = await Sobremesa.findOne({ _id: sobremesa })
        console.log(sobremesa1)
    
        if(!sobremesa1) {
            res.status(404).json({ message: 'A sobremesa informada não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        } 

//validação adicional
        const adicional1 = await Adicional.findOne({ _id: adicional })
        console.log(adicional1)
    
        if(!adicional1) {
            res.status(404).json({ message: 'o adicional informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }  


        await Combo.create(combo)

        
    
        res.status(200).json({message:'Combo cadastrado com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })


     //Get
   router.get('/combos', async (req, res) => {
    try {

        const combo = await Combo.find().populate('prato').populate('bebida').populate('sobremesa').populate('adicional')

        res.status(200).json(combo)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //get por id

   router.get('/combos/:id', async (req, res) => {
    
   const id = req.params.id
   
   try {
    const combo = await Combo.findOne({ _id: id })
    
    
    if(!combo) {
        res.status(404).json({ message: 'O combo informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(combo)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})

//atualização de dados

router.put('/combos/:id', async(req, res) => {
    
    const id = req.params.id

    const { name, description, price, veggie } = req.body

    const combo = {name, description, price, veggie}

    try {
        const updatedCombo = await Combo.updateOne({ _id: id }, combo)
        
        if(updatedCombo.matchedCount === 0) {
         res.status(404).json({ message: "O combo informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Combo atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})




//Delete


router.delete('/combos/:id', async (req, res) => {

    const id = req.params.id

    const combo = await Combo.findOne({ _id: id })
    
    if(!combo) {
        res.status(404).json({ message: 'O combo informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Combo.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Combo excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})



    module.exports = router