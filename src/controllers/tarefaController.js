const Tarefa = require('../models/tarefa');  

class tarefaController {  
    static insert(req, res) {  
        const { titulo, idprojeto, idusuario } = req.body;  
        const id = Tarefa.fetchAll().length + 1;  
        const tarefa = new Tarefa(id, titulo, false, idprojeto, idusuario); 
        tarefa.save();  
        res.status(201).json(tarefa);  
    }  

    static findAll(req, res) {  
        const tarefa = Tarefa.fetchAll();  
        res.json(tarefa);  
    }  
 
    static update(req, res) {  
        const { id } = req.params;  
        const { titulo, status } = req.body;  
        const tarefaAtualizada = Tarefa.update(parseInt(id), titulo, status);  
        if (tarefaAtualizada) {  
            res.json(tarefaAtualizada);  
        } else {  
            res.status(404).json({ message: 'Tarefa não encontrada' });  
        }  
    }  

    static remove(req, res) {  
        const { id } = req.params;  
        const tarefaDeletada = Tarefa.delete(parseInt(id));  
        if (tarefaDeletada) {  
            res.status(204).send(); 
        } else {  
            res.status(404).json({ message: 'Tarefa não encontrada' });  
        }  
    }  
}  

module.exports = tarefaController;  