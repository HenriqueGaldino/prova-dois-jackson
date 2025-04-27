const express = require('express')
const app = express()
const sequelize = require('./config/database');
const database = require('./config/database');

const UsuarioController = require('./controllers/UsuarioController');  
const projetoController = require('./controllers/projetoController');
const tarefaController = require('./controllers/tarefaController');



app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/api/usuario', UsuarioController.criarUsuario); 
app.get('/api/usuario', UsuarioController.listarUsuarios);   
app.put('/api/usuario/:id', UsuarioController.alterarUsuario); 
app.delete('/api/usuario/:id', UsuarioController.deletarUsuario);   
app.post('/api/usuario/login', UsuarioController.login); 

app.post('/api/projeto', projetoController.criarProjeto);
app.get('/api/projeto', projetoController.listarProjetos);
app.put('/api/projeto/:id', projetoController.alterarProjeto);
app.delete('/api/projeto/:id', projetoController.deletarProjeto);

app.post('/api/tarefa', tarefaController.criarTarefa);
app.get('/api/tarefa', tarefaController.listarTarefas);
app.put('/api/tarefa/:id', tarefaController.alterarTarefa);
app.delete('/api/tarefa/:id', tarefaController.deletarTarefa);



database.sync({ force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });
