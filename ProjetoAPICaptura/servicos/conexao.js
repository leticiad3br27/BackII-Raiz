const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'LeUser',
    password: 'Mnb2711@',
    database: 'Usuarios'
});
connection.connect((err) => {
    if (err) {
        console.error('Deu ruim no BD', err);
        return;
    }
    console.log('Deu bom no BD');
});