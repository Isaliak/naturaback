const { Router } = require('express')
const router = Router()
const {
    customerGet,
    customerGetByCi,
    customerCreate,
    customerUpdate,
    customerDelete
} = require('../controllers/customer.controller')

router.get('/', customerGet)
router.get('/:id', customerGetByCi)
router.post('/create', customerCreate)
router.put('/update', customerUpdate)
router.put('/delete', customerDelete)

module.exports = router
