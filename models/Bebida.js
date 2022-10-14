const mongoose = require('mongoose')


const {Schema} = mongoose

const Bebida = mongoose.model(
    'Bebida',
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
        

        alcohol: {
            type: Boolean,
            required: true,
        },
        
    },

    { timestamps: true },
    
    ),

)

module.exports = Bebida