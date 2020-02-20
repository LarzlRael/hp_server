const { Schema, model } = require('mongoose');

const HospitalSchema = new Schema({
    nombre: {
        type: String, required: [true, 'El nombre es necesario'],
    },
    img: {
        type: String, required: false, default: 'aqui va un imagen'
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'hospitales' });

module.exports = model('Hospital', HospitalSchema);