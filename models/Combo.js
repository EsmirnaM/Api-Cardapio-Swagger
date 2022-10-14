const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Combo = mongoose.model(
    'Combo',
    new Schema({

        
        name: {
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


        prato: {
            type: Schema.ObjectId,
            ref: 'Prato'
        },
        

        bebida: {
            type: Schema.ObjectId,
            ref: 'Bebida'
        },

        sobremesa: {
            type: Schema.ObjectId,
            ref: 'Sobremesa'
        }, 

        adicional: {
            type: Schema.ObjectId,
            ref: 'Adicional'
        }, 


    


        
    },


    { timestamps: true },

    ),

)



module.exports = Combo