const router = require('express').Router()

const { application } = require('express')
const Pedido = require('../models/Pedido')
const Prato = require('../models/Prato')
const Bebida = require('../models/Bebida')
const Sobremesa = require('../models/Sobremesa')
const Adicional = require('../models/Adicional')
const Cliente = require('../models/Cliente')




//------------------------------------------Post---------------------------------------------------

router.post('/pedido', async (req,res) => {
    // req.body

    const {codigo, nome, cliente, preço, prato, bebida, sobremesa, adicional} = req.body

 
    
    const pedido = {
        codigo, nome, cliente, preço, prato, bebida, sobremesa, adicional
    }
    
    try {



 //--------------------------------------------validações---------------------------------------------      



//validação cliente
        const cliente1 = await Cliente.findOne({ _id: cliente })
        
    
        if(!cliente1) {
            res.status(404).json({ message: 'a id informada não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }

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

//-----------------------------------------Requisições--------------------------------------------


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


//-------------------------------------------------get pelo código-------------------------------------------------------------

router.get('/pedido/codigo/:codigo', async (req, res) => {
    
    const {codigo} = req.params
    
    try {
     const pedido = await Pedido.findOne({codigo})
     
     
        if(!pedido) {
            res.status(404).json({ message: 'O pedido informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


        else{
        res.status(200).json(pedido)
        }


    } catch (error) {
     res.status(500).json({ error: error})
    }
 })
 

 

//----------------------------------atualização de dados pelo id---------------------------------

router.put('/pedido/:id', async(req, res) => {
    
    const id = req.params.id

    const { codigo, nome, cliente, preço, prato, bebida, sobremesa, adicional} = req.body

    const pedido = {codigo, nome, cliente, preço, prato, bebida, sobremesa, adicional}

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

//---------------------------------atualização de dados chamando pelo codigo---------------------------------------------------

router.put('/pedido/codigo/:codigo', async(req, res) => {
    
    const {codigo} = req.params

    const {nome, cliente, preço, prato, bebida, sobremesa, adicional} = req.body

    const pedido = {codigo, nome, cliente, preço, prato, bebida, sobremesa, adicional}

    try {
        const updatedPedido = await Pedido.updateOne({ codigo }, pedido)
        
        if(updatedPedido.matchedCount === 0) {
         res.status(404).json({ message: "Pedido informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Pedido atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})




//----------------------------------------------Delete pelo id-----------------------------------


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

//------------------------------------------Delete pelo codigo-------------------------------------------------------------------


router.delete('/pedido/codigo/:codigo', async (req, res) => {

    const {codigo} = req.params

    const pedido = await Pedido.findOne({ codigo })
    
    if(!pedido) {
        res.status(404).json({ message: 'Pedido informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Pedido.deleteOne({ codigo })

        res.status(200).json ({ message: 'Pedido excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})







    module.exports = router