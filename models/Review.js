const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    texto: { type: String, required: true },
    nota: { type: Number, min: 1, max: 5, required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    anuncio: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
  },
  {
    collection: 'avaliacoes',
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
