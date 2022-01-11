const express = require('express')
const cors = require('cors');

const verify_token = require('./middlewares/verifyToken')
const AuthController = require('./controllers/authController')
const TaskController = require('./controllers/taskController')
const ListController = require('./controllers/listController')

const authController = new AuthController()
const taskController = new TaskController()
const listController = new ListController()

const app = express()

app.use(cors());
app.use(express.json());

app.post('/user/register', authController.register)
app.post('/user/login', authController.login);
app.post('/user/logout', authController.logout)

app.get('/lists', verify_token, listController.indexAll)
app.get('/lists/:id', verify_token, listController.indexOne)
app.post('/lists', verify_token, listController.create)
app.put('/lists/:id', verify_token, listController.update)
app.delete('/lists/:id', verify_token, listController.remove)

app.post('/tasks', verify_token, taskController.create)
app.delete('/tasks/:id', verify_token, taskController.remove)
app.put('/tasks/:id', verify_token, taskController.update)
app.get('/tasks', verify_token, taskController.index)

app.listen(3000, () => {
  console.log("Aplicação rodando na porta 3000!")
})