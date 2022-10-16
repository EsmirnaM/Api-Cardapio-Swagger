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
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "O email inserido não é valido, por favor verifique e tente novamente"
            }
           
        },


        phone: {
            type: Number,
            required: true
            
        }


        
    },


    { timestamps: true },

    ),

)


module.exports = Cliente