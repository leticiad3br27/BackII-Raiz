// Importa a conexão com o banco de dados
import pool from './conexao.js';

// Função para inserir um usuário no banco
export async function inserirUsuario(nome, email, telefone) {
    // Executa a query para inserir os dados na tabela 'usuarios'
    const [result] = await pool.query(
        'INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)',
        [nome, email, telefone]
    );

    // Retorna um objeto com os dados cadastrados e o ID gerado
    return { id: result.insertId, nome, email, telefone };
}
