const db_connection = require('../db')

class TaskController {
  index(req, res) {
    const date = req.query.date
    const userId = req.user.id
    db_connection.query('SELECT * FROM tbl_tasks WHERE date = ? AND userId = ?', [date, userId], (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).end()
      } else {
        res.status(200)
        res.json(result)
      }
    })
  }
  create(req, res) {
    const task = req.body
    task['userId'] = req.user.id
    db_connection.query('INSERT INTO tbl_tasks SET ?', [task], (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).end()
      } else {
        res.status(201)
        res.json(result)
      }
    })
  }
  remove(req, res) {
    const taskId = req.params.id
    const userId = req.user.id
    db_connection.query('DELETE FROM tbl_tasks WHERE id = ? AND userid = ?', [taskId, userId], (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).end()
      } else {
        res.status(200)
        res.json(result)
      }
    })
  }
  update(req, res) {
    const taskId = req.params.id
    const task = req.body
    const userId = req.user.id
    db_connection.query('UPDATE tbl_tasks SET ? WHERE id = ? AND userId = ?', [task, taskId, userId], (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).end()
      } else {
        res.status(200)
        res.json(result)
      }
    })
  }
}

module.exports = TaskController