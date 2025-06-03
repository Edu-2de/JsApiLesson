const express = require('express');
const router = express.Router();

// Dados simulados (em memória)
const { autores, livros } = require('../data/db');

// Middleware: só admin pode modificar
router.use((req, res, next) => {
    if (req.method !== 'GET' && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Apenas admin pode modificar livros' });
    }
    next();
});

// GET: Listar livros com detalhes do autor (nome do autor no lugar do autorId)
router.get('/', (req, res) => {
    const livrosComAutor = livros.map((livro) => {
        const autor = autores.find((autor) => autor.id === livro.autorId);
        return {
            id: livro.id,
            titulo: livro.titulo,
            autor: autor ? autor.nome : null
        };
    });
    res.json(livrosComAutor);
});

// GET: Obter um livro por ID (com nome do autor)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const livro = livros.find((livro) => livro.id === parseInt(id));
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    const autor = autores.find((autor) => autor.id === livro.autorId);
    res.json({
        id: livro.id,
        titulo: livro.titulo,
        autor: autor ? autor.nome : null
    });
});

// GET: Listar livros com todos os detalhes (inclui objeto autor completo)
router.get('/detalhes', (req, res) => {
    const livrosDetalhados = livros.map((livro) => {
        const autor = autores.find((autor) => autor.id === livro.autorId);
        return { ...livro, autor: autor || null };
    });
    res.json(livrosDetalhados);
});

// POST: Criar um novo livro com validação (apenas admin)
router.post('/', (req, res) => {
    const { id, titulo, autorId } = req.body;

    if (!id || !titulo || !autorId) {
        return res.status(400).json({ error: 'Todos os campos (id, titulo, autorId) são obrigatórios' });
    }

    const autor = autores.find((autor) => autor.id === autorId);
    if (!autor) {
        return res.status(404).json({ error: 'Autor não encontrado' });
    }

    livros.push({ id, titulo, autorId });
    res.status(201).json({ message: 'Livro criado com sucesso!' });
});

// PUT: Atualizar um livro existente (apenas admin)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autorId } = req.body;
    const livro = livros.find((livro) => livro.id === parseInt(id));
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

    if (titulo) livro.titulo = titulo;
    if (autorId) {
        const autor = autores.find((autor) => autor.id === autorId);
        if (!autor) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }
        livro.autorId = autorId;
    }
    res.json({ message: 'Livro atualizado com sucesso!' });
});

// DELETE: Remover um livro (apenas admin)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = livros.findIndex((livro) => livro.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    livros.splice(index, 1);
    res.json({ message: 'Livro removido com sucesso!' });
});

module.exports = router;