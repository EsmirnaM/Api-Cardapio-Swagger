const mongoose = require('mongoose')

const {Schema} = mongoose

const Prato = mongoose.model(
    'Prato',
    new Schema({
        name: {
            type: String,
            required: true, 
            unique: true
            
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            
        },


        veggie: {
            type: Boolean,
            required: true
            
        },


    
        
    },


    { timestamps: true },

    ),

)


module.exports = Prato