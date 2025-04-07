const Projeto = require('../models/projeto');  

class ProjetoController {   
    static insert(req, res) {  
        const { nome, descricao } = req.body;  
        const id = Projeto.fetchAll().length + 1;
        const projeto = new Projeto(id, nome, descricao);  
        projeto.save();  
        res.status(201).json(projeto);  
    }  

    static findAll(req, res) {  
        const projetos = Projeto.fetchAll();  
        res.json(projetos);  
    }  

    static update(req, res) {  
        const { id } = req.params;  
        const { nome, descricao } = req.body;  
        const projetoAtualizado = Projeto.update(parseInt(id), nome, descricao);  
        if (projetoAtualizado) {  
            res.json(projetoAtualizado);  
        } else {  
            res.status(404).json({ message: 'Projeto não encontrado' });  
        }  
    }  

    static remove(req, res) {  
        const { id } = req.params;  
        const projetoDeletado = Projeto.delete(parseInt(id));  
        if (projetoDeletado) {  
            res.status(204).send(); 
        } else {  
            res.status(404).json({ message: 'Projeto não encontrado' });  
        }  
    }  
}  

module.exports = ProjetoController;  