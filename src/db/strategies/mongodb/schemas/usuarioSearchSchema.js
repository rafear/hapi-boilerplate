const Mongoose = require('mongoose')

const usuarioSearchSchema = new Mongoose.Schema({
    nomeUsuario: {
        type: String,
        unique: false,
        required: true
    },
    idadeUsuario: {
        type: String,
        required: true
    },
    id_image: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = Mongoose.models.usuarioSearch || Mongoose.model('usuarioSearch', usuarioSearchSchema)