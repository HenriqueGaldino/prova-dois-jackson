const Tarefa = require('../models/tarefa');  

class TarefaController {  
    async criarTarefa(req, res) {  
        try {  
            console.log(req, res)
            const { titulo, status, id_projeto, id_usuario } = req.body;  // Alterado para 'titulo'  
            if (!titulo || !status || !id_projeto || !id_usuario) {  
                return res.status(400).json({ error: 'Título, status, projeto e usuário são obrigatórios' });  
            }  

            const tarefa = await Tarefa.create({ titulo, status, id_projeto, id_usuario });  // Alterado para 'titulo'  
            return res.status(201).json(tarefa);  
        } catch (error) {  
            return res.status(500).json({ error: error.message });  
        }  
    }  

    async buscarPorId(req, res) {  
        try {  
            const { id } = req.params;  
            if (!id) {  
                return res.status(400).json({ error: 'Id é obrigatório' });  
            }  

            const tarefa = await Tarefa.findByPk(id);  
            if (!tarefa) {  
                return res.status(404).json({ error: 'Tarefa não encontrada' });  
            }  
            return res.json(tarefa);  
        } catch (error) {  
            return res.status(500).json({ error: error.message });  
        }  
    }  

    async alterarTarefa(req, res) {  
        try {  
            const { id } = req.params; 
            const { titulo, status, id_projeto, id_usuario } = req.body;  // Alterado para 'titulo'  

            if (!id || !titulo || !status || !id_projeto || !id_usuario) {  
                return res.status(400).json({ error: 'Id, título, status, projeto e usuário são obrigatórios' });  
            }  

            const tarefa = await this.buscarPorId(id);  
            tarefa.titulo = titulo;  // Alterado para 'titulo'  
            tarefa.status = status;  
            tarefa.id_projeto = id_projeto;  
            tarefa.id_usuario = id_usuario;  
            await tarefa.save();
            return res.json(tarefa);  
        } catch (error) {  
            return res.status(500).json({ error: error.message });  
        }  
    }  

    async deletarTarefa(req, res) {  
        try {  
            const { id } = req.params;  
            if (!id) {  
                return res.status(400).json({ error: 'Id é obrigatório' });  
            }  

            const tarefa = await this.buscarPorId(id);  
            await tarefa.destroy(); 
            return res.status(204).send();   
        } catch (error) {  
            return res.status(500).json({ error: error.message });  
        }  
    }  

    async listarTarefas(req, res) {  
        try {  
            const tarefa = await Tarefa.findAll();  
            return res.json(tarefa);  
        } catch (error) {  
            return res.status(500).json({ error: error.message });  
        }  
    }  
}  

module.exports = new TarefaController();  