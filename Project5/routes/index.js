var express = require('express');
var router = express.Router();

const control = require('../controller/user_control');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/insert', control.insertUsers)

router.get('/getusers', control.getUsers)

router.post('/update', control.updateUsers)

router.post('/delete', control.deleteUsers)
module.exports = router;

