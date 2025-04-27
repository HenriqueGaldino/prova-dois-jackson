const Usuario = require('../models/usuario');  
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');  
require('dotenv').config();  

const saltRounds = 10;  
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;  

class UsuarioController {  
async criarUsuario(req, res) {  
    try {  
        const { nome, email, senha } = req.body; 
        if (!nome || !email || !senha) {  
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });  
        }  

        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);  
        const usuario = await Usuario.create({  
            nome,  
            email,  
            senha: senhaCriptografada  
        });  

        return res.status(201).json(usuario);  
    } catch (error) {  
        return res.status(500).json({ error: error.message });  
    }  
}  

async listarUsuarios(req, res) {  
    try {  
        const usuarios = await Usuario.findAll({  
            attributes: { exclude: ['senha'] }  
        });  
        return res.json(usuarios);  
    } catch (error) {  
        return res.status(500).json({ error: error.message });  
    }  
}  

async alterarUsuario(req, res) {  
    try {  
        const { id } = req.params; 
        const { nome, email, senha } = req.body;
        if (!id || !nome || !email || !senha) {  
            return res.status(400).json({ error: 'Id, nome, email e senha são obrigatórios' });  
        }  

        const usuario = await this.buscarPorId(id);  
        usuario.nome = nome;  
        usuario.email = email;  
        usuario.senha = await bcrypt.hash(senha, saltRounds);  
        await usuario.save();  
        return res.json(usuario);  
    } catch (error) {  
        return res.status(500).json({ error: error.message });  
    }  
}  

async deletarUsuario(req, res) {  
    try {  
        const { id } = req.params; 
        if (!id) {  
            return res.status(400).json({ error: 'Id é obrigatório' });  
        }  

        await this.buscarPorId(id);  
        await usuario.destroy();  
        return res.status(204).send(); 
    } catch (error) {  
        return res.status(500).json({ error: error.message });  
    }  
}  

async buscarPorId(id) {  
    if (!id) {  
        throw new Error('Id é obrigatório');  
    }  
    const usuario = await Usuario.findByPk(id, {  
        attributes: { exclude: ['senha'] }  
    });  
    if (!usuario) {  
        throw new Error('Usuário não encontrado');  
    }  
    return usuario;  
}  

async login(req, res) {  
    try {  
        const { email, senha } = req.body;   
        if (!email || !senha) {  
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });  
        }  

        const usuario = await Usuario.findOne({ where: { email } });  
        if (!usuario) {  
            return res.status(404).json({ error: 'Usuário não encontrado' });  
        }  

        const senhaValida = await bcrypt.compare(senha, usuario.senha);  
        if (!senhaValida) {  
            return res.status(401).json({ error: 'Senha inválida' });  
        }  

        const jwtToken = jwt.sign({ id: usuario.id }, JWT_SECRET_KEY);  
        usuario.token = jwtToken;  
        await usuario.save();  

        return res.json({  
            token: jwtToken,  
            usuario: {  
                id: usuario.id,  
                nome: usuario.nome,  
                email: usuario.email  
            }  
        });  
    } catch (error) {  
        return res.status(500).json({ error: error.message });  
    }  
}  
}  

module.exports = new UsuarioController();  