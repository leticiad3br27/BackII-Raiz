const express = require('express');
const colecaoUF = require('./dados/dados.js');

const app = express();

app.get('/ufs', (req, res) => {
    res.json(colecaoUF.colecaoUf);
});

app.get('/ufs/:iduf', (req, res) => {
    const idUF = parseInt(req.params.iduf);
    const uf = colecaoUF.colecaoUf.find(u => u.id === idUF);
    res.json(uf);
    
    if (!isNaN(idUF)) {
        uf = colecaoUf.find(u => u.id === idUF);
        if (!uf) {
            mensagemErro = 'UF não encontrada';
        }
    } else {
        mensagemErro = 'Requisição inválida';
    }

    if (uf) {
        res.json(uf);
    } else {
        res.status(404).json({ "erro": mensagemErro });
    }

});



app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});
