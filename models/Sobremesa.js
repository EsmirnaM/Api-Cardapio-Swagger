const mongoose = require('mongoose')


const {Schema} = mongoose

const Sobremesa = mongoose.model(
    'Sobremesa',
    new Schema({
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
        

        light: {
            type: Boolean,
            required: true,
        },
        
    },

    { timestamps: true },
    
    ),

)

module.exports = Sobremesa