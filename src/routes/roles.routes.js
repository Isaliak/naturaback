const { Router } = require('express');

const router = Router()
const {
    controllers
} = require('../controllers/roles.controller')

router.get('/', controllers.get)
router.get('/:id', controllers.getById)
router.post('/create', controllers.create)
router.put('/update/:id', controllers.update)
router.put('/delete/:id', controllers.delete)

module.exports = router