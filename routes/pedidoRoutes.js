const router = require('express').Router()

const { application } = require('express')
const Pedido = require('../models/Pedido')
const Prato = require('../models/Prato')
const Bebida = require('../models/Bebida')
const Sobremesa = require('../models/Sobremesa')
const Adicional = require('../models/Adicional')




//------------------------------------------Post---------------------------------------------------

router.post('/pedido', async (req,res) => {
    // req.body

    const {name, description, price, veggie, prato, bebida, sobremesa, adicional} = req.body

 
    
    const pedido = {
        name, description, price, veggie, prato, bebida, sobremesa, adicional
    }
    
    try {
//validação prato
        const prato1 = await Prato.findOne({ _id: prato })
        
    
        if(!prato1) {
            res.status(404).json({ message: 'a id informada não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }

        


//validação bebida
        const bebida1 = await Bebida.findOne({ _id: bebida })
        
    
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


        await Pedido.create(pedido)

        
    
        res.status(200).json({message:'Pedido cadastrado com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })


     //-----------------------------------------Get---------------------------------------------
     router.get('/pedido', async (req, res) => {
    try {

        const pedido = await Pedido.find().populate('cliente').populate('prato').populate('bebida').populate('sobremesa').populate('adicional')

        res.status(200).json(pedido)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //-----------------------------------------get por id---------------------------------------------

   router.get('/pedido/:id', async (req, res) => {
    
   const id = req.params
   
   try {
    const pedido = await Pedido.findOne({ _id: id })
    
    
    if(!pedido) {
        res.status(404).json({ message: 'O pedido informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(pedido)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})

//-------------------------------------------atualização de dados-------------------------------------

router.put('/pedido/:id', async(req, res) => {
    
    const id = req.params.id

    const { name, description, price, veggie } = req.body

    const pedido = {name, description, price, veggie}

    try {
        const updatedPedido = await Pedido.updateOne({ _id: id }, pedido)
        
        if(updatedPedido.matchedCount === 0) {
         res.status(404).json({ message: "O pedido informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Pedido atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//----------------------------------------------Delete-----------------------------------


router.delete('/pedido/:id', async (req, res) => {

    const id = req.params.id

    const pedido = await Pedido.findOne({ _id: id })
    
    if(!pedido) {
        res.status(404).json({ message: 'O pedido informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Pedido.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Pedido excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})





    module.exports = router