const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Rotas de usuários
const adRoutes = require('./routes/adRoutes'); // Rotas de anúncios
const reviewRoutes = require('./routes/reviewRoutes'); // Rotas de avaliações

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do aplicativo Express
const app = express();
app.use(express.json()); // Middleware para interpretar JSON

// Conexão com o MongoDB Atlas
mongoose
  .connect('mongodb+srv://destinow:destisggg@cluster0.jalau.mongodb.net/destinow_db?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Configurar rotas
app.use('/api/users', userRoutes); // Rotas de usuários
app.use('/api/ads', adRoutes); // Rotas de anúncios
app.use('/api/reviews', reviewRoutes); // Rotas de avaliações

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


