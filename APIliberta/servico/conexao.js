import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'leticia',
    password: 'Mnb2711@',
    database: 'libertadores'
});

pool.getConnection().then(() => {
    console.log('Banco de dados acessado com sucesso!');
}).catch(() => {
    console.log('Erro ao acessar o banco de dados.');
});

export default pool;