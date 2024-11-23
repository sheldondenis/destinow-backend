const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Configuração de variáveis de ambiente
dotenv.config();

// Configuração do Express
const app = express();
app.use(express.json());

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Configurar rotas de API
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/reviews', reviewRoutes);

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o front-end (para SPA como React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


