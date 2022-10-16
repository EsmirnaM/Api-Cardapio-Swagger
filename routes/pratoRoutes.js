const router = require('express').Router()

const { application } = require('express')
const Prato = require('../models/Prato')





//-----------------------------------------------Post-------------------------------------------

router.post('/prato', async (req,res) => {
    // req.body

    const {name, description, price, veggie} = req.body
    

    const prato = {
        name, description, price, veggie, 
    }

    try {

    //-----------------------------------------validações-----------------------------------------


    //-----------------------validação caso esteja faltando inserir um dado-----------------------    

        if(!name && !description && !price && !veggie){
        res.status(400).json({error:'É necessario informar nome, descrição, preço e se o prato é ou não vegetariano'})
        return 
        }

        if(!name && !description && !price){
            res.status(400).json({error:'É necessario informar nome, descrição e o preço do prato'})
            return 
            }
    
        if(!name && !description && !veggie){
            res.status(400).json({error:'É necessario informar nome, descrição e se o prato é ou não vegetariano'})
            return 
            }

        if(!name && !price && !veggie){
            res.status(400).json({error:'É necessario informar nome, preço e se o prato é ou não vegetariano'})
            return 
            }

        if(!description && !price && !veggie){
            res.status(400).json({error:'É necessario informar preço, descrição, preço e se o prato é ou não vegetariano'})
            return 
            }

        if(!name && !description ) {
            res.status(400).json({error:'É necessario informar o nome e a descrição do prato'})
            return
            }

        if(!name && !price ) {
            res.status(400).json({error:'É necessario informar o nome e o preço do prato'})
            return
            }

        if(!name && !veggie ) {
            res.status(400).json({error:'É necessario informar o nome e se o prato é vegetariano'})
            return
            }

        if(!description && !veggie ) {
            res.status(400).json({error:'É necessario informar a descrição e se o prato é vegetariano'})
            return
            }
        

        if(!name) {
            res.status(400).json({error:'É necessario informar o nome do prato'})
            return
        }

        
    
        if(!description) {
            res.status(400).json({error:'É necessario informar a descrição do prato'})
            return
        }
    
        if(!price) {
            res.status(400).json({error:'É necessario informar o preço do prato'})
            return
        }

        
    
        if(veggie == undefined) {
            res.status(500).json({error:'É necessario informar se o prato é vegetariano ou não'})
            return
        }


    //----------------validação caso o dado informado já existe na base de dados---------------------

        //nome
        const nomeExiste = await Prato.findOne ({name: name})

        if (nomeExiste){
            res.status(400).json({
                message: 'O nome informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }

        //descrição
        const descriptionExiste = await Prato.findOne ({description: description})

        if (descriptionExiste){
            res.status(400).json({
                message: 'A descrição informada já existe, por favor verifique os dados e tente novamente'
            })
            return
        }


        
     
        await Prato.create(prato)
    
        res.status(200).json({message:'Prato cadastrado com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }



    
    })


    


    //-------------------------------------------Get---------------------------------------------
   router.get('/pratos', async (req, res) => {
    try {

        const prato = await Prato.find()

        res.status(200).json(prato)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //------------------------------------get por id----------------------------------------

   router.get('/prato/:id', async (req, res) => {
    
   const id = req.params.id
   
   try {
    const prato = await Prato.findOne({ _id: id })
    
    
    if(!prato) {
        res.status(404).json({ message: 'O prato informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(prato)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})


//---------------------------------------get pelo name--------------------------------------


router.get('/prato/name/:name', async (req, res) => {
    
    const {name} = req.params
    
    try {
     const prato = await Prato.findOne({ name: name })
     
     
        if(!prato) {
            res.status(404).json({ message: 'O prato informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


        else{
        res.status(200).json(prato)
        }


    } catch (error) {
     res.status(500).json({ error: error})
    }
 })
 

//-------------------------------------atualização de dados----------------------------------------------



router.put('/prato/:id', async(req, res) => {
    
    const id = req.params.id

    const { name, description, price, veggie } = req.body

    const prato = {name, description, price, veggie}

    try {
        const updatedPrato = await Prato.updateOne({ _id: id }, prato)
        
        if(updatedPrato.matchedCount === 0) {
         res.status(404).json({ message: "O prato informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Prato atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//---------------------------------------------Delete-------------------------------------------


router.delete('/prato/:id', async (req, res) => {

    const id = req.params.id

    const prato = await Prato.findOne({ _id: id })
    
    if(!prato  ) {
        res.status(404).json({ message: 'O prato informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }



    try {

        await Prato.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Prato excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})



    module.exports = router
    