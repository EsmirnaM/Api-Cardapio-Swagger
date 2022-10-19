const router = require('express').Router()

const { application } = require('express')
const Adicional = require('../models/Adicional')



//-----------------------------------------Post------------------------------------------------

router.post('/adicional', async (req,res) => {
    // req.body

    const {codigo, nome, descrição, preço, vegetariano} = req.body
    console.log(req.body)


   

    const adicional = {
        codigo, nome, descrição, preço, vegetariano, 
    }
    
    try {

        
    //---------------------------------validações----------------------------------

     //-----------------------validação caso esteja faltando inserir um dado-----------------------    

     if(!nome && !descrição && !preço && !vegetariano){
        res.status(400).json({error:'É necessario informar nome, descrição, preço e se o adicional é ou não vegetariano'})
        return 
        }

        if(!nome && !descrição && !preço){
            res.status(400).json({error:'É necessario informar nome, descrição e o preço do adicional'})
            return 
            }
    
        if(!nome && !descrição && !vegetariano){
            res.status(400).json({error:'É necessario informar nome, descrição e se o adicional é ou não vegetariano'})
            return 
            }

        if(!nome && !preço && !vegetariano){
            res.status(400).json({error:'É necessario informar nome, preço e se o adicional é ou não vegetariano'})
            return 
            }

        if(!descrição && !preço && !vegetariano){
            res.status(400).json({error:'É necessario informar preço, descrição, preço e se o adicional é ou não vegetariano'})
            return 
            }

        if(!nome && !descrição ) {
            res.status(400).json({error:'É necessario informar o nome e a descrição do adicional'})
            return
            }

        if(!nome && !preço ) {
            res.status(400).json({error:'É necessario informar o nome e o preço do adicional'})
            return
            }

        if(!nome && !vegetariano ) {
            res.status(400).json({error:'É necessario informar o nome e se o adicional é vegetariano'})
            return
            }

        if(!descrição && !vegetariano ) {
            res.status(400).json({error:'É necessario informar a descrição e se o adicional é vegetariano'})
            return
            }
        

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

        
    
        if(vegetariano == undefined) {
            res.status(500).json({error:'É necessario informar se o adicional é vegetariano ou não'})
            return
        }


    
    //---------------validação caso o dado informado já exista na base de dados-------------------------

        //código
            const codigoExiste = await Adicional.findOne ({codigo: codigo})

                if (codigoExiste){
                    res.status(400).json({
                        message: 'O código informado já existe, por favor verifique os dados e tente novamente'
                    })
                    return
                }
        

     
        await Adicional.create(adicional)
    
        res.status(200).json({message:'Adicional cadastrado com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
    })
    

    //------------------------------------------------------Get--------------------------------------------------------------



   router.get('/adicionais', async (req, res) => {
    

    try {

        const adicional = await Adicional.find()

        res.status(200).json(adicional)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


//-----------------------------------------------get por id-----------------------------------------------------------------


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


//-------------------------------------------------get pelo código-------------------------------------------------------------

router.get('/adicional/codigo/:codigo', async (req, res) => {
    
    const {codigo} = req.params
    
    try {
     const adicional = await Adicional.findOne({codigo})
     
     
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
 

//-------------------------------------atualização de dados chamando pelo id---------------------------------------------------
-
router.put('/adicional/:id', async(req, res) => {
    
   

    const { codigo, nome, descrição, preço, vegetariano} = req.body

    const adicional = {codigo, nome, descrição, preço, vegetariano}

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

//---------------------------------atualização de dados chamando pelo codigo---------------------------------------------------

router.put('/adicional/codigo/:codigo', async(req, res) => {
    
    const {codigo} = req.params

    const { nome, descrição, preço, vegetariano} = req.body

    const adicional = {nome, descrição, preço, vegetariano}

    try {
        const updatedAdicional = await Adicional.updateOne({ codigo }, adicional)
        
        if(updatedAdicional.matchedCount === 0) {
         res.status(404).json({ message: "Adicional informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Adicional atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//--------------------------------------------------Delete pelo id----------------------------------------------------------------------


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


//------------------------------------------Delete pelo codigo-------------------------------------------------------------------


router.delete('/adicional/codigo/:codigo', async (req, res) => {

    const {codigo} = req.params

    const adicional = await Adicional.findOne({ codigo })
    
    if(!adicional) {
        res.status(404).json({ message: 'Adicional informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Adicional.deleteOne({ codigo })

        res.status(200).json ({ message: 'Adicional excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})




    module.exports = router
    