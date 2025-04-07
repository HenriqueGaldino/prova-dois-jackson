const Usuario = require('../models/usuario');  

class usuarioController {  
    static insert(req, res) {  
        const { nome, email, senha } = req.body;  
        const id = Usuario.fetchAll().length + 1;  
        const usuario = new Usuario(id, nome, email, senha);  
        usuario.save();  
        res.status(201).json(usuario);  
    }  
 
    static findAll(req, res) {  
        const usuarios = Usuario.fetchAll();  
        res.json(usuarios);  
    }  

    static update(req, res) {  
        const { id } = req.params;  
        const { nome, email, senha } = req.body;  
        const usuarioAtualizado = Usuario.update(parseInt(id), nome, email, senha);  
        if (usuarioAtualizado) {  
            res.json(usuarioAtualizado);  
        } else {  
            res.status(404).json({ message: 'Usuário não encontrado' });  
        }  
    }  

    static remove(req, res) {  
        const { id } = req.params;  
        const usuarioDeletado = Usuario.delete(parseInt(id));  
        if (usuarioDeletado) {  
            res.status(204).send();  
        } else {  
            res.status(404).json({ message: 'Usuário não encontrado' });  
        }  
    }  
}  

module.exports = usuarioController;  