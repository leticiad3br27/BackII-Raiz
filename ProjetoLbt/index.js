
import pool from "./servico/conexao.js";
import express  from "express";



const app =express();

app.listen(9000, async () => {
    const data= new Date ();
    console.log('Servidor iniciado em:'+data);
    const conexao  = await pool.getConnection();
    console.log(conexao.threadId);
    conexao.release();
})