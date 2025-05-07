// POST: Criar um novo livro com validação
router.post('/', (req, res) => {
      const { id, titulo, autorId } = req.body;
  
      // Validação de entrada
      if (!id || !titulo || !autorId) {
          return res.status(400).json({ error: 'Todos os campos (id, titulo, autorId) são obrigatórios' });
      }
  
      // Verificar se o autor existe
      const autor = autores.find((autor) => autor.id === autorId);
      if (!autor) {
          return res.status(404).json({ error: 'Autor não encontrado' });
      }
  
      livros.push({ id, titulo, autorId });
      res.status(201).json({ message: 'Livro criado com sucesso!' });
  });