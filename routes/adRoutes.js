const express = require('express');
const Ad = require('../models/Ad');
const router = express.Router();

// Criar anúncio
router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, preco, localizacao, anunciante } = req.body;

    const ad = new Ad({ titulo, descricao, preco, localizacao, anunciante });
    await ad.save();
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar anúncio.', details: err.message });
  }
});

// Listar anúncios
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find().populate('anunciante', 'nome email');
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar anúncios.', details: err.message });
  }
});

module.exports = router;
