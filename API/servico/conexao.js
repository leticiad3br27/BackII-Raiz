import mysql from 'mysql2/promise';
const pool =mysql.createPool({
    host:'localhost',
    user:'libertadores',
    password:'Mnb2711@',
    database:'libertadores'
})
export default pool;