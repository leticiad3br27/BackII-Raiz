const express = require('express');
const usuariosRouter = require('./routes/usuarios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/usuarios', usuariosRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});