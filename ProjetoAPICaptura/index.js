// Importa os módulos necessários
import express from 'express';
import cors from 'cors';
import { inserirUsuario } from './cadastro_servico.js';
import { validarUsuario } from './valida.js';

// Inicializa o Express
const app = express();
app.use(cors()); // Permite requisições de diferentes origens (CORS)
app.use(express.json()); // Permite o recebimento de JSON nas requisições

// Rota para cadastrar usuários
app.post('/usuarios', async (req, res) => {
    const { nome, email, telefone } = req.body;

    // Valida os dados antes de salvar no banco
    const erroValidacao = validarUsuario(nome, email, telefone);
    if (erroValidacao) {
        return res.status(400).json({ erro: erroValidacao });
    }

    try {
        // Chama a função para inserir o usuário no banco
        const usuario = await inserirUsuario(nome, email, telefone);
        res.status(201).json(usuario);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao cadastrar o usuário.' });
    }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporta a aplicação (para facilitar testes)
export default app;
