const { Router } = require('express')
const router = Router()
const transaction_calculator = require('../controllers/transaction_calculator.controller')
router.get('/acumulacion/:id', transaction_calculator.acumulacion)

module.exports = router
