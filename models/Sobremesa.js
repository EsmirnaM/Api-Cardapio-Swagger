const mongoose = require('mongoose')


const {Schema} = mongoose

const Sobremesa = mongoose.model(
    'Sobremesa',
    new Schema({
        name:{
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
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