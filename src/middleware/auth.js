const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = [
    { username: 'admin', password: '1234', role: 'admin' }
];

// Rota de registro
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
    }
    if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: 'Usuário já existe' });
    }
    users.push({ username, password, role: 'user' });
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

// Rota de login para gerar o token
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username, role: user.role }, 'chave_secreta', { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ error: 'Credenciais inválidas' });
});

router.post('/logout', (req, res) => {
    // Em JWT, o logout é feito no cliente (removendo o token).
    res.json({ message: 'Logout realizado com sucesso. Remova o token do cliente.' });
});

module.exports = { router, users };