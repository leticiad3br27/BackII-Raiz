import express from 'express';
import { buscaHist, buscarPorAno, buscarPorId } from './servico/servicos.js';


const app = express();

app.get('/hist', (req, res) => {
    const historico = buscaHist(); // Certifique-se de que buscaHist é uma função que retorna os dados
    res.json(historico);
});

app.get('/hist/ano/:ano', (req, res) => {
    const ano = parseInt(req.params.ano, 10);
    if (isNaN(ano)) {
        return res.status(400).send({ "erro": "Ano inválido" });
    }
    const historico = buscarPorAno(ano);
    if (historico) {
        res.json(historico);
    } else {
        res.status(404).send({ "erro": "Ano não encontrado" });
    }
});

app.get('/hist/id/:idht', (req, res) => {
    const idht = req.params.idht;
    if (isNaN(parseInt(idht))) {
        return res.status(400).send({ "erro": "Requisição inválida" });
    }
    const id = buscarPorId(idht);
    if (id) {
        res.json(id);
    } else {
        res.status(404).send({ "erro": "ID não encontrada" });
    }
});

app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});
