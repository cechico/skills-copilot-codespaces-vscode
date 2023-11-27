// Create web server using express
var express = require('express');
var router = express.Router();
// Create connection to database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'F@_c0nN3cT',
  database : 'comments'
});
// Connect to database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});
// Create the table if it doesn't exist
connection.query("CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT, name VARCHAR(255), comment VARCHAR(255), PRIMARY KEY (id))", function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
// Display all comments
router.get('/', function(req, res, next) {
  connection.query("SELECT * FROM comments", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
// Insert a new comment
router.post('/', function(req, res, next) {
  var name = req.body.name;
  var comment = req.body.comment;
  connection.query("INSERT INTO comments (name, comment) VALUES (?, ?)", [name, comment], function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
// Export router
module.exports = router;