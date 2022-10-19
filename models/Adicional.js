const mongoose = require('mongoose')


const {Schema} = mongoose

const Adicional = mongoose.model(
    'Adicional',
    new Schema({

        codigo:{
            type: Number,
            required: true,
            unique: true
        },

        nome:{
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
        
    },

    { timestamps: true },
    
    ),

)

module.exports = Adicional