const mongoose = require('mongoose')


const {Schema} = mongoose

const Bebida = mongoose.model(
    'Bebida',
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
        

        álcool: {
            type: Boolean,
            required: true,
        },
        
    },

    { timestamps: true },
    
    ),

)

module.exports = Bebida