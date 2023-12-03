const port = 3000

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const express = require('express')
const db = require('./database/db')
const app = express()
const itemController = require('./controllers/itemController')
const userController = require('./controllers/userController')

app.use(express.json())
db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
    console.log(`Servidor iniciado! Porta: ${port}`);
});

// Items
app.get('/items', (req, res, next) => {
    itemController.listItems().then((items) => res.send(items))
        .catch((err) => {
            console.log('Erro na consulta do item', JSON.stringify(err))
            return res.send(err)
        });
});

app.get('/items/:id', (req, res, next) => {
    itemController.getItem(req.params.id).then((items) => res.send(items))
        .catch((err) => {
            console.log('Erro na consulta do item', JSON.stringify(err))
            return res.send(err)
        });
});

app.delete('/items/:id', (req, res, next) => {
    try {
        ret = itemController.deleteItem(req.params.id);
        res.send(ret);
    } catch (err) {
        next(err);
    }
});

app.post('/items', (req, res, next) => {
    itemController.createItem({
        id: req.body.id,
        nome: req.body.nome,
        valor: req.body.valor
    })
        .then((item) => res.send(item))
        .catch((err) => {
            console.log('Erro no cadastro do item', JSON.stringify(err))
            return res.status(400).send(err)
        });
});

app.patch('/items/:id', (req, res, next) => {
    const novosValores = {
        nome: req.body.nome,
        valor: req.body.valor
    };

    itemController.updateItem(req.params.id, novosValores)
        .then((novosValores) => res.send(novosValores))
        .catch((err) => {
            console.log('Erro na atualização do item', JSON.stringify(err));
            return res.status(400).send(err.message || err);
        });
});

// Users
app.get('/users', (req, res, next) => {
    userController.listUsers().then((items) => res.send(items))
        .catch((err) => {
            console.log('Erro na consulta do usuário', JSON.stringify(err))
            return res.send(err)
        });
});

app.get('/users/:id', (req, res, next) => {
    userController.getUser(req.params.id).then((items) => res.send(items))
        .catch((err) => {
            console.log('Erro na consulta do usuário', JSON.stringify(err))
            return res.send(err)
        });
});

app.delete('/users/:id', (req, res, next) => {
    try {
        ret = userController.deleteUser(req.params.id);
        res.send(ret);
    } catch (err) {
        next(err);
    }
});

app.post('/users', (req, res, next) => {
    userController.createUser({
        id: req.body.id,
        nome: req.body.nome,
        valor: req.body.valor
    })
        .then((item) => res.send(item))
        .catch((err) => {
            console.log('Erro no cadastro do usuário', JSON.stringify(err))
            return res.status(400).send(err)
        });
});

app.patch('/users/:id', (req, res, next) => {
    const novosValores = {
        nome: req.body.nome,
        valor: req.body.valor
    };

    userController.updateUser(req.params.id, novosValores)
        .then((novosValores) => res.send(novosValores))
        .catch((err) => {
            console.log('Erro na atualização do usuário', JSON.stringify(err));
            return res.status(400).send(err.message || err);
        });
});