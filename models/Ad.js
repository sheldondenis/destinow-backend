const mongoose = require('mongoose');

const adSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    localizacao: { type: String, required: true },
    anunciante: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    collection: 'acomodacoes', // Nome da coleção no MongoDB
    timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
  }
);

module.exports = mongoose.model('Ad', adSchema);

