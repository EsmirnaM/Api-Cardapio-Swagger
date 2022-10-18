const router = require('express').Router()

const { application } = require('express')
const Adicional = require('../models/Adicional')



//-----------------------------------------Post------------------------------------------------

router.post('/adicional', async (req,res) => {
    // req.body

    const {nome, descrição, preço, vegetariano} = req.body
    console.log(req.body)


   

    const adicional = {
        nome, descrição, preço, vegetariano, 
    }
    
    try {

        
    //---------------------------------validações----------------------------------


    //validação caso esteja faltando inserir um dado

        if(!nome) {
            res.status(400).json({error:'É necessario informar o nome do adicional'})
            return
        }
    
        if(!descrição) {
            res.status(400).json({error:'É necessario informar a descrição do adicional'})
            return
        }
    
        if(!preço) {
            res.status(400).json({error:'É necessario informar o preço do adicional'})
            return
        }
        
        if(vegetariano == "undefined") {
            res.status(500).json({error:'É necessario informar se o adicional e vegetariano ou não'})
            return
        }


    //---------------validação caso o dado informado já exista na base de dados-------------------------

 
        //nome
        const nomeExiste = await Adicional.findOne ({nome: nome})

        if (nomeExiste){
            res.status(400).json({
                message: 'O nome informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }

        //descrição
        const descriçãoExiste = await Adicional.findOne ({descrição: descrição})

        if (descriçãoExiste){
            res.status(400).json({
                message: 'A descrição informada já existe, por favor verifique os dados e tente novamente'
            })
            return
        }

     
        await Adicional.create(adicional)
    
        res.status(200).json({message:'Adicional cadastrado com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })
    

    //------------------------------------Get------------------------------------



   router.get('/adicionais', async (req, res) => {
    

    try {

        const adicional = await Adicional.find()

        res.status(200).json(adicional)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //-------------------------------------get por id----------------------------------------------


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


//-----------------------------------get pelo nome----------------------------------------------

router.get('/adicional/nome/:nome', async (req, res) => {
    
    const {nome} = req.params
    
    try {
     const adicional = await Adicional.findOne({ nome: nome })
     
     
        if(!adicional) {
            res.status(404).json({ message: 'O adicional informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


        else{
        res.status(200).json(adicional)
        }


    } catch (error) {
     res.status(500).json({ error: error})
    }
 })
 

//---------------------------------atualização de dados--------------------------------------------

router.put('/adicional/:id', async(req, res) => {
    
    const id = req.params.id

    const { nome, descrição, preço, vegetariano} = req.body

    const adicional = {nome, descrição, preço, vegetariano}

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


//------------------------------------------Delete-----------------------------------------------


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
    