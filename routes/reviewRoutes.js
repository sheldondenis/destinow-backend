const express = require('express');
const Review = require('../models/Review'); // Modelo de avaliações
const router = express.Router();

// Criar uma nova avaliação
router.post('/', async (req, res) => {
  const { texto, nota, autor, anuncio } = req.body;

  // Validação básica
  if (!texto || !nota || !autor || !anuncio) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const review = new Review({ texto, nota, autor, anuncio });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar avaliação.', details: err.message });
  }
});

// Listar avaliações de um anúncio
router.get('/:anuncioId', async (req, res) => {
  const { anuncioId } = req.params;

  try {
    const reviews = await Review.find({ anuncio: anuncioId }).populate('autor', 'nome email');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar avaliações.', details: err.message });
  }
});

module.exports = router;

