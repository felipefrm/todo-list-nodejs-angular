const db_connection = require('../db')

class ListController {
  indexAll(req, res) {
    const userId = req.user.id
    db_connection.query('SELECT id, name, status FROM tbl_lists WHERE userId = ?', [userId], (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).end()
      } else {
        res.status(200)
        res.json(result)
      }
    }); 
  }

  indexOne(req, res) {
    const listId = req.params.id 
    const userId = req.user.id
    db_connection.query('SELECT * FROM tbl_tasks WHERE listId = ? AND userId = ?', [listId, userId], (error, result) => {
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
    const list = req.body
    list['userId'] = req.user.id
    db_connection.query('INSERT INTO tbl_lists SET ?', [list], (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).end()
      } else {
        res.status(201)
        res.json(result.insertId)
      }
    })
  }

  update(req, res) {
    const listId = req.params.id
    const userId = req.user.id
    const list = req.body
    db_connection.query('UPDATE tbl_lists SET ? WHERE id = ? AND userId = ?', [list, listId, userId], (error, result) => {
      if (error) {
        console.log(error)
        res.status(500).end()
      } else {
        res.status(200)
        res.json(result)
      }
    })
  }


  remove(req, res) {
    const userId = req.user.id
    const listId = req.params.id
    db_connection.query('DELETE FROM tbl_lists WHERE id = ? AND userId = ?', [listId, userId], (error, result) => {
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

module.exports = ListController