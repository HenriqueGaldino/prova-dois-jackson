const database = require('../config/database');  

class Projeto {  
    constructor() {  
        this.model = database.define('projeto', {  
            id: {  
                type: database.Sequelize.INTEGER,  
                primaryKey: true,  
                autoIncrement: true  
            },  
            name: {  
                type: database.Sequelize.STRING,  
                allowNull: false,  
                validate: {  
                    notEmpty: true // Ensure name is not empty  
                }  
            },  
            description: { 
                type: database.Sequelize.STRING  
            }  
        });  
    }  
}  

module.exports = (new Projeto).model;