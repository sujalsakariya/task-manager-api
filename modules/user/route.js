var express = require('express');
var router = express.Router();
const controllers = require('./controllers')

// signup, login, forgot-password, reset-password

// update

// GET POST PUT PATCH DELETE


router.post('/signup', controllers.Signup);
router.get('/read', controllers.read);
router.post('/login', controllers.login);

module.exports = router;
