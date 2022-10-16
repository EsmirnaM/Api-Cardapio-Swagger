const Cliente = require ('../models/Cliente')

module.exports = class clienteController {
    static async register(req, res) {
       
        const {name, cpf, email, phone} = req.body
        
        //validação se algum dado não for inserido

        if(!name) {
            res.status(404).json({message: ' É necessario inserir o seu nome'})
            return
        }

        if(!cpf) {
            res.status(404).json({message: ' É necessario inserir o seu cpf'})
            return
        }

        if(!email) {
            res.status(404).json({message: ' É necessario inserir o seu email'})
            return
        }

        if(!elefone) {
            res.status(404).json({message: ' É necessario inserir o seu telefone'})
            return
        }


        //validação caso já exista

        const clienteExiste = await Cliente.findone ({email: email})

        if (clienteExiste){
            res.status(400).json({
                message: 'email informado já existe, por favor utilize outro email'
            })
            return
        }


    }
}