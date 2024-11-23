const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Criação do app Express
const app = express();
app.use(express.json()); // Middleware para interpretar JSON

// Conexão com o MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rota raiz para mensagem amigável
app.get('/', (req, res) => {
  res.send('Bem-vindo ao backend do Destinow!');
});

// Configurar rotas
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/reviews', reviewRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

