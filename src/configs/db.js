const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((erreur) => {
    if (erreur) {
        console.error('Erreur de connexion à la base de données :', erreur);
        return;
    }
    console.log('Connexion à la base de données réussie !');
});

module.exports = connection;