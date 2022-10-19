const router = require('express').Router()

const { application } = require('express')
const Sobremesa = require('../models/Sobremesa')





//-----------------------------------------------Post-------------------------------------------

router.post('/sobremesa', async (req,res) => {
    // req.body

    const {codigo, nome, descrição, preço, light} = req.body
    

    const sobremesa = {
        codigo, nome, descrição, preço, light, 
    }

    try {

    //-----------------------------------------validações-----------------------------------------


    //-----------------------validação caso esteja faltando inserir um dado-----------------------    

        if(!nome && !descrição && !preço && !light){
        res.status(400).json({error:'É necessario informar nome, descrição, preço e se a sobremesa é ou não light'})
        return 
        }

        if(!nome && !descrição && !preço){
            res.status(400).json({error:'É necessario informar nome, descrição e o preço da sobremesa'})
            return 
            }
    
        if(!nome && !descrição && !light){
            res.status(400).json({error:'É necessario informar nome, descrição e se oa sobremesa é ou não light'})
            return 
            }

        if(!nome && !preço && !light){
            res.status(400).json({error:'É necessario informar nome, preço e se a sobremesa é ou não light'})
            return 
            }

        if(!descrição && !preço && !light){
            res.status(400).json({error:'É necessario informar preço, descrição, preço e se a sobremesa é ou não light'})
            return 
            }

        if(!nome && !descrição ) {
            res.status(400).json({error:'É necessario informar o nome e a descrição da sobremesa'})
            return
            }

        if(!nome && !preço ) {
            res.status(400).json({error:'É necessario informar o nome e o preço da sobremsa'})
            return
            }

        if(!nome && !light ) {
            res.status(400).json({error:'É necessario informar o nome e se a sobremesa é light'})
            return
            }

        if(!descrição && !light ) {
            res.status(400).json({error:'É necessario informar a descrição e se a sobremesa é light'})
            return
            }
        

        if(!nome) {
            res.status(400).json({error:'É necessario informar o nome da sobremesa'})
            return
        }

        
    
        if(!descrição) {
            res.status(400).json({error:'É necessario informar a descrição da sboremesa'})
            return
        }
    
        if(!preço) {
            res.status(400).json({error:'É necessario informar o preço da sobremesa'})
            return
        }

        
    
        if(light == undefined) {
            res.status(500).json({error:'É necessario informar se a sobremesa é light ou não'})
            return
        }


    //----------------validação caso o dado informado já existe na base de dados---------------------

       

        //codigo
        const codigoExiste = await Sobremesa.findOne ({codigo: codigo})

        if (codigoExiste){
            res.status(400).json({
                message: 'o codigo informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }


        
     
        await Sobremesa.create(sobremesa)
    
        res.status(200).json({message:'Sobremesa cadastrada com sucesso' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }



    
    })


    


    //-------------------------------------------Get---------------------------------------------
   
    router.get('/sobremesas', async (req, res) => {
    try {

        const sobremesa = await Sobremesa.find()

        res.status(200).json(sobremesa)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //------------------------------------get por id----------------------------------------

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


//-------------------------------------------------get pelo código-------------------------------------------------------------

router.get('/sobremesa/codigo/:codigo', async (req, res) => {
    
    const {codigo} = req.params
    
    try {
     const sobremesa = await Sobremesa.findOne({codigo})
     
     
        if(!sobremesa) {
            res.status(404).json({ message: 'A sobremesa informada não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


        else{
        res.status(200).json(sobremesa)
        }


    } catch (error) {
     res.status(500).json({ error: error})
    }
 })
 

 

//-------------------------------------atualização de dados pelo id----------------------------------------------



router.put('/sobremesa/:id', async(req, res) => {
    
    const id = req.params.id

    const { nome, descrição, preço, light } = req.body

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

//---------------------------------atualização de dados chamando pelo codigo---------------------------------------------------

router.put('/sobremesa/codigo/:codigo', async(req, res) => {
    
    const {codigo} = req.params

    const { nome, descrição, preço, light} = req.body

    const sobremesa= {nome, descrição, preço, light}

    try {
        const updatedSobremesa = await Sobremesa.updateOne({ codigo }, sobremesa)
        
        if(updatedSobremesa.matchedCount === 0) {
         res.status(404).json({ message: "Sobremesa informada não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Sobremesa atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//---------------------------------------------Delete-------------------------------------------


router.delete('/sobremesa/:id', async (req, res) => {

    const id = req.params.id

    const sobremesa = await Sobremesa.findOne({ _id: id })
    
    if(!sobremesa  ) {
        res.status(404).json({ message: 'A sobremesa informada não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }



    try {

        await Sobremesa.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Sobremesa excluida com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//------------------------------------------Delete pelo codigo-------------------------------------------------------------------


router.delete('/sobremesa/codigo/:codigo', async (req, res) => {

    const {codigo} = req.params

    const sobremesa = await Sobremesa.findOne({ codigo })
    
    if(!sobremesa) {
        res.status(404).json({ message: 'Sobremesa informada não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Sobremesa.deleteOne({ codigo })

        res.status(200).json ({ message: 'Sobremesa excluida com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})





    module.exports = router
    