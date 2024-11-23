const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Anunciante = require('../models/Anunciante'); // Modelo para anunciantes
const router = express.Router();

// Rota para registrar usuário
router.post('/register', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já registrado.' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const user = new User({ nome, email, senha: hashedPassword, tipo });
    const savedUser = await user.save();

    // Se for anunciante, salvar também na coleção "anunciantes"
    if (tipo === 'anunciante') {
      const anunciante = new Anunciante({
        nome,
        email,
        usuarioId: savedUser._id, // Relacionar com o ID do usuário
      });
      await anunciante.save();
    }

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      id: savedUser._id,
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário.', details: err.message });
  }
});

module.exports = router;



