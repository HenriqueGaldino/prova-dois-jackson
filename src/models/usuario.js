const database = require('../config/database');

class Usuario {
    constructor() {
        this.model = database.define('usuario', {
            id: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.Sequelize.STRING
            },
            email: {
                type: database.Sequelize.STRING
            },
            senha: {
                type: database.Sequelize.STRING
            },
            token: {
                type: database.Sequelize.STRING
            }
        });
    }
}

module.exports = (new Usuario()).model;
