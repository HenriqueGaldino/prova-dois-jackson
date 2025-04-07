const tarefas = []

class Tarefa {
    constructor(id,titulo, status, idprojeto, idusuario) {
        this.id = id;
        this.titulo = titulo;
        this.status = status | false;
        this.idprojeto = idprojeto;
        this.idusuario = idusuario;
    }

    save() {
        tarefas.push(this);
    }

    static fetchAll() {
        return tarefas;
    }

    static update(id, titulo, status, idprojeto, idusuario) {  
        const tarefa = tarefas.find(p => p.id === id);  
        if (tarefa) {  
            tarefa.titulo = titulo;
            tarefa.status = status;
            tarefa.idprojeto = idprojeto;
            tarefa.idusuario = idusuario;
            return tarefa;  
        }  
        return null;  
    }  

    static delete(id) {  
        const index = tarefas.findIndex(p => p.id === id);  
        if (index !== -1) {  
            tarefas.splice(index, 1);  
            return true;  
        }  
        return false;  
    }  
}

module.exports = Tarefa;