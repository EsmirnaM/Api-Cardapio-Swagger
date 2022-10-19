const router = require('express').Router()

const { application } = require('express')
const Cliente = require('../models/Cliente')





//-----------------------------------------------Post-------------------------------------------

router.post('/cliente', async (req,res) => {
    // req.body

    const {codigo, nome, sobrenome, cpf, email, telefone} = req.body
    

    const cliente = {
        codigo, nome, sobrenome, cpf, email, telefone, 
    }

    try {

//-----------------------------------------validações-------------------------------------------------


    //-----------------------validação caso esteja faltando inserir um dado-----------------------    



        //***1*/
        if(!codigo && !nome && !sobrenome && !cpf && !email && !telefone){
        res.status(400).json({error:'É necessario informar codigo, nome, sobrenome, cpf, email e telefone '})
        return 
        }

        if(!codigo && !nome && !sobrenome && !cpf && !email){
            res.status(400).json({error:'É necessario informar codigo, nome, sobrenome, cpf e email'})
            return 
            }

        if(!codigo && !nome && !sobrenome && !cpf && !telefone){
            res.status(400).json({error:'É necessario informar codigo, nome, sobrenome, cpf e telefone'})
            return 
            }

        if(!codigo && !nome && !sobrenome && !email && !telefone){
            res.status(400).json({error:'É necessario informar codigo, nome, sobrenome, email e telefone'})
            return 
            }

        if(!codigo && !nome && !cpf && !email && !telefone){
            res.status(400).json({error:'É necessario informar codigo, nome, cpf, email e telefone'})
            return 
            }

        if(!codigo && !sobrenome && !cpf && !email && !telefone){
            res.status(400).json({error:'É necessario informar codigo, sobrenome, cpf, email e telefone'})
            return 
            }

        if(!nome && !sobrenome && !cpf && !email && !telefone){
            res.status(400).json({error:'É necessario informar nome, sobrenome, cpf, email e telefone'})
            return 
            }

        
        //***2*/

        if(!codigo && !nome && !sobrenome && !cpf){
            res.status(400).json({error:'É necessario informar codigo, nome, sobrenome e cpf'})
            return 
            }

        if(!codigo && !nome && !email && !telefone){
            res.status(400).json({error:'É necessario informar codigo, nome, email e telefone'})
            return 
            }

        if(!sobrenome && !cpf && !email && !telefone){
            res.status(400).json({error:'É necessario informar sobrenome, cpf, email e telefone'})
            return 
            }

        if(!sobrenome && !cpf && !email && !telefone){
            res.status(400).json({error:'É necessario informar sobrenome, cpf, email e telefone'})
            return 
            }

        //***3*/

        if(!codigo && !nome && !sobrenome){
            res.status(400).json({error:'É necessario informar codigo, nome e sobrenome'})
            return 
            }

        if(!cpf && !email && !telefone){
            res.status(400).json({error:'É necessario informar cpf,email e telefone'})
            return 
            }

        
        //***2*/
        if(!codigo && !nome){
            res.status(400).json({error:'É necessario informar codigo e nome'})
            return 
            }

        if(!sobrenome && !cpf){
            res.status(400).json({error:'É necessario informar sobrenome, e cpf '})
            return 
            }

        if(!email && !telefone){
            res.status(400).json({error:'É necessario informar email, e telefone '})
            return 
            }

        //***3*/

        if(!codigo){
            res.status(400).json({error:'É necessario informar o codigo'})
            return 
            }

        if(!nome){
            res.status(400).json({error:'É necessario informar o nome'})
            return 
            }

        if(!sobrenome){
            res.status(400).json({error:'É necessario informar o sobrenome'})
            return 
            }

        if(!cpf){
            res.status(400).json({error:'É necessario informar o cpf'})
            return 
            }

        if(!email){
            res.status(400).json({error:'É necessario informar o email'})
            return 
            }

        if(!telefone){
            res.status(400).json({error:'É necessario informar o telefone'})
            return 
            }
    


//----------------validação caso o dado informado já existe na base de dados---------------------

        //codigo
        const codigoExiste = await Cliente.findOne ({codigo: codigo})

        if (codigoExiste){
            res.status(400).json({
                message: 'O código informado já existe, por favor verifique os dados e tente novamente'
            })
            return
        }
    
    


        //cpf
        const cpfExiste = await Cliente.findOne ({cpf: cpf})

        if (cpfExiste){
            res.status(400).json({
                message: 'O cpf informado já se encontra cadastrado no sistema, por favor verifique os dados e tente novamente'
            })
            return
        }
     

  
        await Cliente.create(cliente)
    
        res.status(200).json({message:'Cliente cadastrado com sucesso' })
        
        } catch (error) {
            res.status(500).json({ error: error })
        }
        
        })


    


    //-------------------------------------------Get---------------------------------------------
   router.get('/clientes', async (req, res) => {
    try {

        const cliente = await Cliente.find()

        res.status(200).json(cliente)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

   })


   //------------------------------------get por id----------------------------------------

   router.get('/cliente/:id', async (req, res) => {
    
   const id = req.params.id
   
   try {
    const cliente = await Cliente.findOne({ _id: id })
    
    
    if(!cliente) {
        res.status(404).json({ message: 'O cliente informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    res.status(200).json(cliente)

   } catch (error) {
    res.status(500).json({ error: error})
   }
})


//-------------------------------------------------get pelo código-------------------------------------------------------------

router.get('/cliente/codigo/:codigo', async (req, res) => {
    
    const {codigo} = req.params
    
    try {
     const cliente = await Cliente.findOne({codigo})
     
     
        if(!cliente) {
            res.status(404).json({ message: 'O cliente informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


        else{
        res.status(200).json(cliente)
        }


    } catch (error) {
     res.status(500).json({ error: error})
    }
 })


 //-------------------------------------------------get pelo cpf-------------------------------------------------------------


 router.get('/cliente/cpf/:cpf', async (req, res) => {
    
    const {cpf} = req.params
    
    try {
     const cliente = await Cliente.findOne({cpf})
     
     
        if(!cliente) {
            res.status(404).json({ message: 'O cliente informado não existe, porfavor verifique os dados inseridos e tente novamente'})
            return
        }


        else{
        res.status(200).json(cliente)
        }


    } catch (error) {
     res.status(500).json({ error: error})
    }
 })
 

 

//-------------------------------------atualização de dados pelo id----------------------------------------------



router.put('/cliente/:id', async(req, res) => {
    
    const id = req.params.id

    const { codigo, nome, sobrenome, cpf, email, telefone} = req.body

    const cliente = {codigo, nome, sobrenome, cpf, email, telefone}

    try {
        const updatedCliente = await Cliente.updateOne({ _id: id }, cliente)
        
        if(updatedCliente.matchedCount === 0) {
         res.status(404).json({ message: "O cliente informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Cliente atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})

//---------------------------------atualização de dados chamando pelo codigo---------------------------------------------------

router.put('/cliente/codigo/:codigo', async(req, res) => {
    
    const {codigo} = req.params

    const { nome, sobrenome, cpf, email, telefone} = req.body

    const cliente = {codigo, nome, sobrenome, cpf, email, telefone}

    try {
        const updatedCliente = await Cliente.updateOne({ codigo }, cliente)
        
        if(updatedCliente.matchedCount === 0) {
         res.status(404).json({ message: "Cliente informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Cliente atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//---------------------------------atualização de dados chamando pelo cpf---------------------------------------------------

router.put('/cliente/cpf/:cpf', async(req, res) => {
    
    const {cpf} = req.params

    const { codigo, nome, sobrenome, email, telefone} = req.body

    const cliente = {codigo, nome, sobrenome, cpf, email, telefone}

    try {
        const updatedCliente = await Cliente.updateOne({ cpf }, cliente)
        
        if(updatedCliente.matchedCount === 0) {
         res.status(404).json({ message: "Cliente informado não existe, porfavor verifique os dados inseridos e tente novamente"})   
         return
        }

        res.status(200).json ({ message: 'Cliente atualizado com sucesso'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
 
})


//---------------------------------------------Delete-------------------------------------------


router.delete('/cliente/:id', async (req, res) => {

    const id = req.params.id

    const cliente = await Cliente.findOne({ _id: id })
    
    if(!cliente ) {
        res.status(404).json({ message: 'O cliente informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }



    try {

        await Cliente.deleteOne({ _id: id})

        res.status(200).json ({ message: 'Cliente excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//------------------------------------------Delete pelo codigo-------------------------------------------------------------------


router.delete('/cliente/codigo/:codigo', async (req, res) => {

    const {codigo} = req.params

    const cliente = await Cliente.findOne({ codigo })
    
    if(!cliente) {
        res.status(404).json({ message: 'Cliente informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Cliente.deleteOne({ codigo })

        res.status(200).json ({ message: 'Cliente excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//------------------------------------------Delete pelo cpf-------------------------------------------------------------------


router.delete('/cliente/cpf/:cpf', async (req, res) => {

    const {cpf} = req.params

    const cliente = await Cliente.findOne({ cpf })
    
    if(!cliente) {
        res.status(404).json({ message: 'Cliente informado não existe, porfavor verifique os dados inseridos e tente novamente'})
        return
    }

    try {

        await Cliente.deleteOne({ cpf })

        res.status(200).json ({ message: 'Cliente excluido com sucesso'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }

})





    module.exports = router
    