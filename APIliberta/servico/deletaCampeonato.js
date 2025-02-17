import pool from "./conexao.js";
export async function deletaCampeoato(id) {
    const conexao = await pool.getConnection();
    const query = "DELETE FROM campeonatos WHERE id = ?";
    const[resposta]= await conexao.execute(query, [id]);
    console.log(resposta); 
    conexao.release();
    
    return resposta ;
    
}