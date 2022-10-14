const mongoose = require('mongoose')

const {Schema} = mongoose

const Cliente = mongoose.model(
    'Cliente',
    new Schema({
        name: {
            type: String,
            required: true, 
            unique: true
        },

        cpf: {
            type: Number,
            required: true
        },

        email: {
            type: String,
            required: true
        },


        phone: {
            type: Number,
            required: true
            
        },


    
        
    },


    { timestamps: true },

    ),

)


module.exports = Cliente