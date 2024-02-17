const router = require('express').Router();
const tasks = require('../controllers/tasks.controller')

router.get('/', tasks.findAll);

router.post('/', tasks.create);

router.get('/:id', tasks.findById);

router.get('/getByUserId/:userId', tasks.findByUserId);

router.put('/:id', tasks.updateById);

router.delete('/:id', tasks.updateById);

module.exports = router;