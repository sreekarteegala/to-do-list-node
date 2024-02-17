const router = require('express').Router();
const Users = require('../controllers/users.controller')

router.get('/', Users.findAll);

router.post('/', Users.create);

router.post('/login', Users.login);

module.exports = router;