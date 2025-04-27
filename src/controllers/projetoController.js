const Projeto = require('../models/projeto');  

class ProjetoController { 

    async criarProjeto(req, res) {   
        const { name, description } = req.body; 

        if (typeof name !== 'string' || typeof description !== 'string') {
            return res.status(400).json({ error: 'Nome e descrição devem ser strings' });
        }

        if (!name || !description) {  
            return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });  
        }  

        try {  
            const projeto = await Projeto.create({ name, description });  
            return res.status(201).json(projeto);  
        } catch (error) {  
            console.error(error); // Log the error for debugging
            return res.status(500).json({ error: error.message }); 
        }  
    }  

    
    async buscarPorId(req, res) {  
        const { id } = req.params;  

        if (!id) {  
            return res.status(400).json({ error: 'Id é obrigatório' });  
        }  

        try {  
            const projeto = await Projeto.findByPk(id);  
            if (!projeto) {  
                return res.status(404).json({ error: 'Projeto não encontrado' });  
            }  
            return res.json(projeto); // Retorna o projeto encontrado  
        } catch (error) {  
            console.error(error);  
            return res.status(500).json({ error: error.message });  
        }  
    }  

    async alterarProjeto(req, res) {   
        const { id } = req.params;  
        const { name, description } = req.body;  

        if (!id || !name || !description) {  
            return res.status(400).json({ error: 'Id, nome e descrição são obrigatórios' });  
        }  

        try {  
            const projeto = await this.buscarPorId({ params: { id } });  
            if (!projeto) {
                return res.status(404).json({ error: 'Projeto não encontrado' });
            }
            projeto.name = name;  
            projeto.description = description;  
            await projeto.save();   
            return res.json(projeto); // Retorna o projeto atualizado  
        } catch (error) {  
            console.error(error);  
            return res.status(500).json({ error: error.message });  
        }  
    }  

    async deletarProjeto(req, res) {  
        const { id } = req.params;  

        if (!id) {  
            return res.status(400).json({ error: 'Id é obrigatório' });  
        }  

        try {  
            const projeto = await this.buscarPorId({ params: { id } });  
            if (!projeto) {
                return res.status(404).json({ error: 'Projeto não encontrado' });
            }
            await projeto.destroy();   
            return res.status(204).send(); 
        } catch (error) {  
            console.error(error);  
            return res.status(500).json({ error: error.message });  
        }  
    }  
  
    async listarProjetos(req, res) {  
        try {  
            const projetos = await Projeto.findAll();  
            return res.json(projetos);  
        } catch (error) {  
            console.error(error);  
            return res.status(500).json({ error: error.message });  
        }  
    }  
}  

module.exports = new ProjetoController();  