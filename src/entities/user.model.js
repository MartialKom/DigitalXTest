const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});


module.exports.Utilisateur = sequelize.define('Utilisateur',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    
    });

sequelize.sync()
    .then(() => {
        console.log('Modèles synchronisés avec la base de données.');
    })
    .catch((erreur) => {
        console.error('Erreur lors de la synchronisation des modèles :', erreur);
    });

