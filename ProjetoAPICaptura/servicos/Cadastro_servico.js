const express = require('express');
const router = express.Router();


const validarDados = (dados) => {
    const { nome, email, telefone } = dados;

    if (!nome || nome.length < 2) {
        return 'O nome deve ter pelo menos 2 caracteres.';
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regexEmail.test(email)) {
        return 'O e-mail deve estar no formato email@provedor.com.';
    }

    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefone || !regexTelefone.test(telefone)) {
        return 'O telefone deve estar no formato (XX) XXXXX-XXXX.';
    }

    return null; 
};

router.post('/', (req, res) => {
    const dados = req.body;
    const erro = validarDados(dados);
    
    if (erro) {
        return res.status(400).json({ erro });
    }


    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', dados });
});

module.exports = router;