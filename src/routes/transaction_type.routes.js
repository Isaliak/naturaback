const { Router } = require('express')
const router = Router()
const {
    transaction_typeGet,
    transaction_typeGetById,
    transaction_typeCreate,
    transaction_typeUpdate,
    transaction_typeDelete
} = require('../controllers/transactio_type.controller')
router.get('/', transaction_typeGet)
router.get('/:id', transaction_typeGetById)
router.post('/create', transaction_typeCreate)
router.put('/update/:id', transaction_typeUpdate)
router.put('/delete/:id', transaction_typeDelete)

module.exports = router
