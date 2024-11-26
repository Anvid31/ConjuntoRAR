import mongoose, { model } from 'mongoose'

const schema = new mongoose.Schema({
    titulo: String,
    urlImagen: String,
    url: String
})

export default model('Pija', schema, 'pijas')
