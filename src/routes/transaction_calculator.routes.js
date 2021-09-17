const { Router } = require('express')
const router = Router()
const transaction_calculator = require('../controllers/transaction_calculator.controller')
router.get('/acumulacion/:ci', transaction_calculator.acumulacion)
router.get('/redencion/:ci', transaction_calculator.redencion)


module.exports = router
