const router = require('express').Router()

const { application } = require('express')
const Bebida = require('../models/Bebida')


//---------------------------------------Post--------------------------------------------

router.post('/bebida', async (req,res) => {
    // req.body

    const {name, description, price, alcohol} = req.body.id




    const bebida = {
        name, description, price, alcohol
    }
    
    try {
 
//---------------------------------validações----------------------------------


    //validação caso esteja faltando inserir um dado

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



    //validação caso o dado informado já existe na base de dados

        //nome
        const nomeExiste = await Bebida.findOne ({name: name})

        if (nomeExiste){
            res.status(400).json({
                message: 'O nome informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }

        //descrição
        const descriptionExiste = await Bebida.findOne ({description: description})

        if (descriptionExiste){
            res.status(400).json({
                message: 'A descrição informada já existe, por favor verifique os dados e tente novamente'
            })
            return
        }

     
        await Bebida.create(bebida)
    
        res.status(200).json({message:'Bebida cadastrada com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })


    //--------------------------------------Get---------------------------------------------------
   router.get('/bebidas', async (req, res) => {
    try {

        const bebida = await Bebida.find()

        res.status(200).json(bebida)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //------------------------------------get por id-------------------------------------------

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


//----------------------------------get pelo name--------------------------------------
router.get('/bebida/name/:name', async (req, res) => {
    
    const {name} = req.params
    
    try {
     const bebida = await Bebida.findOne({ name: name })
     
     
        if(!bebida) {
            res.status(404).json({ message: 'A bebida informada não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


        else{
        res.status(200).json(bebida)
        }


    } catch (error) {
     res.status(500).json({ error: error})
    }
 })
 

//-------------------------------------atualização de dados---------------------------------------

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


//--------------------------------------------Delete-------------------------------------


router.delete('/bebida/:id', async (req, res) => {

    const id = req.params.id

    const bebida = await Bebida.findOne({ _id: id })


    try {

        if(!bebida) {
            res.status(404).json({ message: 'A bebida informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }
    
        else{
            res.status(200).json(bebida)
            }

        await Bebida.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Bebida excluida com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})



    module.exports = router
    
    