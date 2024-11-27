import mongoose, { model } from 'mongoose'

const schema = new mongoose.Schema({
    titulo: String,
    urlImagen: String,
    url: String,
    gender: String
})

export default mongoose.model('Pija', schema, 'pijas')
