const mongoose = require('mongoose')


const {Schema} = mongoose

const Adicional = mongoose.model(
    'Adicional',
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
        
        veggie: {
            type: Boolean,
            required: true,
        },
        
    },

    { timestamps: true },
    
    ),

)

module.exports = Adicional