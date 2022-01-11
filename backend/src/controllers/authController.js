const db_connection = require('../db')
const jwt = require('jsonwebtoken');

class AuthController {

  register(req, res) {
    const new_user = req.body
    db_connection.query("INSERT INTO tbl_users SET ?", [new_user], (err, result) => {
      if (err) {
        if (err.code == 'ER_DUP_ENTRY') res.status(400).end()
        console.log(err)
        res.status(500).end()
      } else {
        res.status(201)
        res.json(result)
      }
    })
  }

  login(req, res) {
    const user = req.body;
    db_connection.query("SELECT * FROM tbl_users WHERE email = ? and password = ?", [user.email, user.password], (err, result) => {
      if (result.length == 0) {
        res.status(401);
        res.send({token: null, user: null, success: false});
      } else {
        const user_data = result[0];
        let token = jwt.sign({email: user_data.email, id: user_data.id}, 'appanotai', {expiresIn: 6000});
        res.status(200);
        res.send({token: token, user: user_data, success: true});
      }
    });
  }

  logout(req, res) {
    res.send({token: null, user: null, success: false});
    res.status(200).end()
  }
}

module.exports = AuthController