const router = require('express').Router()

const { application } = require('express')
const Bebida = require('../models/Bebida')





//-----------------------------------------------Post-------------------------------------------

router.post('/bebida', async (req,res) => {
    // req.body

    const {codigo, nome, descrição, preço, álcool} = req.body
    

    const bebida = {
        codigo, nome, descrição, preço, álcool, 
    }

    try {

    //-----------------------------------------validações-----------------------------------------


    //-----------------------validação caso esteja faltando inserir um dado-----------------------    

        if(!nome && !descrição && !preço && !álcool){
        res.status(400).json({error:'É necessario informar nome, descrição, preço e se a bebida tem álcool'})
        return 
        }

        if(!nome && !descrição && !preço){
            res.status(400).json({error:'É necessario informar nome, descrição e o preço da bebida'})
            return 
            }
    
        if(!nome && !descrição && !álcool){
            res.status(400).json({error:'É necessario informar nome, descrição e se a bebida tem álcool'})
            return 
            }

        if(!nome && !preço && !álcool){
            res.status(400).json({error:'É necessario informar nome, preço e se a bebida tem álcool'})
            return 
            }

        if(!descrição && !preço && !álcool){
            res.status(400).json({error:'É necessario informar preço, descrição, preço e se a bebida tem álcool'})
            return 
            }

        if(!nome && !descrição ) {
            res.status(400).json({error:'É necessario informar o nome e a descrição da bebida'})
            return
            }

        if(!nome && !preço ) {
            res.status(400).json({error:'É necessario informar o nome e o preço da bebida'})
            return
            }

        if(!nome && !álcool ) {
            res.status(400).json({error:'É necessario informar o nome e se a bebida tem álcool'})
            return
            }

        if(!descrição && !álcool ) {
            res.status(400).json({error:'É necessario informar a descrição e se a bebida tem álcool'})
            return
            }
        

        if(!nome) {
            res.status(400).json({error:'É necessario informar o nome da bebida'})
            return
        }

        
    
        if(!descrição) {
            res.status(400).json({error:'É necessario informar a descrição da bebida'})
            return
        }
    
        if(!preço) {
            res.status(400).json({error:'É necessario informar o preço da bebida'})
            return
        }

        
    
        if(álcool == undefined) {
            res.status(500).json({error:'É necessario informar se a bebida tem álcool'})
            return
        }


    //----------------validação caso o dado informado já existe na base de dados---------------------

        //codigo
        const codigoExiste = await Bebida.findOne ({codigo: codigo})

        if (codigoExiste){
            res.status(400).json({
                message: 'O codigo informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }

        //nome
        const nomeExiste = await Bebida.findOne ({nome: nome})

        if (nomeExiste){
            res.status(400).json({
                message: 'O nome informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }


        
     
        await Bebida.create(bebida)
    
        res.status(200).json({message:'Bebida cadastrada com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }



    
    })


    


    //-------------------------------------------Get---------------------------------------------
   router.get('/bebidas', async (req, res) => {
    try {

        const bebida = await Bebida.find()

        res.status(200).json(bebida)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //------------------------------------get por id----------------------------------------

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


//-------------------------------------------------get pelo código-------------------------------------------------------------

router.get('/bebida/codigo/:codigo', async (req, res) => {
    
    const {codigo} = req.params
    
    try {
     const bebida = await Bebida.findOne({codigo})
     
     
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
 

 

//-------------------------------------atualização de dados pelo id----------------------------------------------



router.put('/bebida/:id', async(req, res) => {
    
    const id = req.params.id

    const { codigo, nome, descrição, preço, álcool } = req.body

    const bebida = {codigo, nome, descrição, preço, álcool}

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

//---------------------------------atualização de dados chamando pelo codigo---------------------------------------------------

router.put('/bebida/codigo/:codigo', async(req, res) => {
    
    const {codigo} = req.params

    const { nome, descrição, preço, álcool} = req.body

    const bebida = {nome, descrição, preço, álcool}

    try {
        const updatedBebida = await Bebida.updateOne({ codigo }, bebida)
        
        if(updatedBebida.matchedCount === 0) {
         res.status(404).json({ message: "A bebida informada não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Bebida atualizada com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//---------------------------------------------Delete-------------------------------------------


router.delete('/bebida/:id', async (req, res) => {

    const id = req.params.id

    const bebida = await Bebida.findOne({ _id: id })
    
    if(!bebida  ) {
        res.status(404).json({ message: 'A bebida informada não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }



    try {

        await Bebida.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Bebida excluida com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//------------------------------------------Delete pelo codigo-------------------------------------------------------------------


router.delete('/bebida/codigo/:codigo', async (req, res) => {

    const {codigo} = req.params

    const bebida = await Bebida.findOne({ codigo })
    
    if(!bebida) {
        res.status(404).json({ message: 'A Bebida informada não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Bebida.deleteOne({ codigo })

        res.status(200).json ({ message: 'Bebida excluida com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})





    module.exports = router
    