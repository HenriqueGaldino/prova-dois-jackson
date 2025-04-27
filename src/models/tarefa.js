const database = require('../config/database');  

class Tarefa {  
    constructor() {  
        this.model = database.define('tarefa', {  
            id: {  
                type: database.Sequelize.INTEGER,  
                primaryKey: true,  
                autoIncrement: true  
            },  
            titulo: {   
                type: database.Sequelize.STRING,  
                allowNull: false  
            },  
            status: {  
                type: database.Sequelize.STRING,  
                allowNull: false  
            },  
            id_projeto: {  
                type: database.Sequelize.INTEGER,  
                allowNull: false  
            },  
            id_usuario: {  
                type: database.Sequelize.INTEGER,  
                allowNull: false  
            }  
        });  
    }  
}  

module.exports = (new Tarefa).model;  