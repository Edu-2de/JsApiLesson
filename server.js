const express = require('express');
const app = express();
const PORT = 3000;

const livrosRoutes = require('./src/routes/livros');
const autoresRoutes = require('./src/routes/autores');
const { router: authRoutes } = require('./src/middleware/auth');
const autenticar = require('./src/middleware/verifyToken');

app.use(express.json());

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/livros', autenticar, livrosRoutes);
app.use('/autores', autenticar, autoresRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.send('Bem-vindo à API RESTful!');
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app;