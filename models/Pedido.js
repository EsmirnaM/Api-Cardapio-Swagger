const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Pedido = mongoose.model(
    'Pedido',
    new Schema({

        
        nome: {
            type: String,
            required: true
        },

        descrição: {
            type: String,
            required: true
        },

        preço: {
            type: Number,
            required: true
        },


        vegetariano: {
            type: Boolean,
            required: true,
        },

        cliente: {
            type: Schema.ObjectId,
            ref: 'Cliente'
        }, 


        prato: {
            type: Schema.ObjectId,
            ref: 'Prato',

           
        },
        

        bebida: {
            type: Schema.ObjectId,
            ref: 'Bebida'
        },

        sobremesa: {
            type: Schema.ObjectId,
            ref: 'Sobremesa'
        }, 

        adicional: {
            type: Schema.ObjectId,
            ref: 'Adicional'
        }, 


        


    


        
    },


    { timestamps: true },

    ),

)



module.exports = Pedido