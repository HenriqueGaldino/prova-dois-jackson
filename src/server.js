const express = require('express')
const usuarioController = require('./controllers/usuarioController')
const projetoController = require('./controllers/projetoController')
const tarefaController = require('./controllers/tarefaController')
const app = express()




app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/usuario', usuarioController.insert);
app.get('/usuario', usuarioController.findAll);
app.put('/usuario/:id', usuarioController.update);
app.delete('/usuario/:id', usuarioController.remove);

app.post('/projeto', projetoController.insert);
app.get('/projeto', projetoController.findAll);
app.put('/projeto/:id', projetoController.update);
app.delete('/projeto/:id', projetoController.remove);

app.post('/tarefa', tarefaController.insert);
app.get('/tarefa', tarefaController.findAll);
app.put('/tarefa/:id', tarefaController.update);
app.delete('/tarefa/:id', tarefaController.remove);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})