import pool from "./conexao.js";

async function executaQuery(conexao, query, params = []) {
    const [resultados] = await conexao.execute(query, params);
    return resultados;
}

export async function retornaCampeonatos() {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, campeao, vice, ano FROM campeonatos';
    const campeonatos = await executaQuery(conexao, query);
    conexao.release();
    return campeonatos;
}

export async function retornaCampeonatosID(id) {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, campeao, vice, ano FROM campeonatos WHERE id = ?';
    const campeonatos = await executaQuery(conexao, query, [id]);
    conexao.release();
    return campeonatos;
}

export async function retornaCampeonatosAno(ano) {
    const conexao = await pool.getConnection();
    const campeonatos = await executaQuery(conexao, 'SELECT id, campeao, vice, ano FROM campeonatos WHERE ano = ?', [ano]);
    conexao.release();
    return campeonatos;
}

export async function retornaCampeonatosTime(time) {
    const conexao = await pool.getConnection();
    const campeonatos = await executaQuery(conexao, 'SELECT id, campeao, vice, ano FROM campeonatos WHERE campeao = ?', [time]);
    conexao.release();
    return campeonatos;
}