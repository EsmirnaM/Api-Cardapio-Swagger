const mongoose = require('mongoose')

const {Schema} = mongoose

const Prato = mongoose.model(
    'Prato',
    new Schema({
        
        codigo:{
            type: Number,
            required: true,
            unique: true
        },

        nome: {
            type: String,
            required: true, 
            unique: true
            
        },

        descrição: {
            type: String,
            required: true
        },

        preço: {
            type: Number,
            required: true,
            
        },


        vegetariano: {
            type: Boolean,
            required: true
            
        },


    
        
    },


    { timestamps: true },

    ),

)


module.exports = Prato