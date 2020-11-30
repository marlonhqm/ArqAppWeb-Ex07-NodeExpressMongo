const mongoose = require('mongoose') 

const candidatoSchema = new mongoose.Schema({
    nome : {
        type: String,
        required: true
    },
    partido: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    votos: {
        type: Number,
        required: true
    },
    status: {
        type: String,  // ATIVO, INATIVO, SUSPENSO
        required: true
    },
    criadoEm: {
        type: Date,
        required: true,
        default: Date.now
    },
    atualizadoEm: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('candidato', candidatoSchema)
