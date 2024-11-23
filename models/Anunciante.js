const mongoose = require('mongoose');

const anuncianteSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    collection: 'anunciantes', // Nome da coleção no MongoDB
  }
);

module.exports = mongoose.model('Anunciante', anuncianteSchema);
