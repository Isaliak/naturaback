const { Router } = require('express')
const router = Router()
const {
    bottleGet,
    bottleGetById,
    bottleCreate,
    bottleUpdate,
    bottleDelete
} = require('../controllers/bottle.controller')
router.get('/', bottleGet)
router.get('/:id', bottleGetById)
router.post('/create', bottleCreate)
router.put('/update/:id', bottleUpdate)
router.put('/delete/:id', bottleDelete)

module.exports = router
