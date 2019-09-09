const { Schema, model} = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user : {
        type: String,
        required: true
    },
    bio: String, //não é obrigatorio pode fazer assim
    avatar : {
        type: String,
        required: true
    },
    likes : [{
        type: Schema.Types.ObjectId,  
        ref: 'Dev'
    }], // Como se fosse uma chave estrangeira
    dislikes : [{
        type: Schema.Types.ObjectId,  
        ref: 'Dev'
    }],
}, {timestamps: true}); //cria atomatico as colunas createdAt e updatedAt)

module.exports = model('Dev', DevSchema);