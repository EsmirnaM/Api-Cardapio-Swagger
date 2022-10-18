const router = require('express').Router()

const { application } = require('express')
const Sobremesa = require('../models/Sobremesa')


//-------------------------------------------Post----------------------------------------------------

router.post('/sobremesa', async (req,res) => {
    // req.body

    const {nome, descrição, preço, light} = req.body

    
//-----------------------------------------validações-----------------------------------------


//--------------------------validação caso esteja faltando inserir um dado-----------------------
    
    if(!nome) {
        res.status(400).json({error:'É necessario informar o nome da sobremesa'})
        return
    }

    if(!descrição) {
        res.status(400).json({error:'É necessario informar a descrição da sobremesa'})
        return
    }

    if(!preço) {
        res.status(400).json({error:'É necessario informar o preço da sobremesa'})
        return
    }

    //----------------validação caso o dado informado já existe na base de dados---------------------

        //nome
        const nomeExiste = await Sobremesa.findOne ({nome: nome})

        if (nomeExiste){
            res.status(400).json({
                message: 'O nome informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }

        //descrição
        const descriçãoExiste = await Sobremesa.findOne ({descrição: descrição})

        if (descriçãoExiste){
            res.status(400).json({
                message: 'A descrição informada já existe, por favor verifique os dados e tente novamente'
            })
            return
        }



    
    const sobremesa = {
        nome, descrição, preço, light
    }
    
    try {
     
        await Sobremesa.create(sobremesa)
    
        res.status(200).json({message:'Sobremesa cadastrada com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })


    //---------------------------------------------Get---------------------------------------
   
   
   
    router.get('/sobremesas', async (req, res) => {
    try {

        const sobremesa = await Sobremesa.find()

        res.status(200).json(sobremesa)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //----------------------------------------get por id----------------------------------------


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

//--------------------------------------atualização de dados----------------------------------------



router.put('/sobremesa/:id', async(req, res) => {
    
    const id = req.params.id

    const { nome, descrição, preço, light} = req.body

    const sobremesa = {nome, descrição, preço, light}

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


//------------------------------------------------Delete--------------------------------------------


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
    