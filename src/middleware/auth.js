const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Rota de login para gerar o token
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulação de autenticação (substituir por lógica real, se necessário)
    if (username === 'admin' && password === '1234') {
        // Gera o token com uma chave secreta e tempo de expiração de 1 hora
        const token = jwt.sign({ username }, 'chave_secreta', { expiresIn: '1h' });
        return res.json({ token });
    }

    // Retorna erro se as credenciais forem inválidas
    res.status(401).json({ error: 'Credenciais inválidas' });
});

module.exports = router;