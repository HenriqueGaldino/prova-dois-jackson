const usuarios = []

class Usuario {
    constructor(id,nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    save() {
        usuarios.push(this)
    }

    static fetchAll() {
        return usuarios;
    }

    static update(id, nome, email, senha) {  
        const usuario = usuarios.find(p => p.id === id);  
        if (usuario) {  
            usuario.nome = nome;
            usuario.email = email;
            usuario.senha = senha;
            return usuario;  
        }  
        return null;  
    }  

    static delete(id) {  
        const index = usuarios.findIndex(p => p.id === id);  
        if (index !== -1) {  
            usuarios.splice(index, 1);  
            return true;  
        }  
        return false;  
    }  
}

module.exports = Usuario;