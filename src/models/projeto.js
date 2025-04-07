const projetos = []

class Projeto {
    constructor(id,nome, descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        
    }

    save() {
        projetos.push(this);
    }

    static fetchAll() {
        return projetos;
    }
    
    static update(id, nome, descricao) {  
        const projeto = projetos.find(p => p.id === id);  
        if (projeto) {  
            projeto.nome = nome;
            projeto.descricao = descricao;
            return projeto;  
        }  
        return null;  
    }  

    static delete(id) {  
        const index = projetos.findIndex(p => p.id === id);  
        if (index !== -1) {  
            projetos.splice(index, 1);  
            return true;  
        }  
        return false;  
    }  
}

module.exports = Projeto;