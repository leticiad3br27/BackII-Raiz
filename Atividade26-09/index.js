const express = require('express');
const livros = require('./dados/dados.js');
const app = express();

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const livro = livros.livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) {
        return res.status(404).send('Livro não encontrado');
    }
    res.json(livro);
});

app.use((req, res) => {
    res.status(404).send('Requisição não encontrada');
});

app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});
