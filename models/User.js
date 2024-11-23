const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipo: { type: String, enum: ['viajante', 'anunciante'], required: true },
  },
  {
    collection: 'usuarios', // Nome da coleção dentro do banco destinow_db
  }
);

module.exports = mongoose.model('User', userSchema);

