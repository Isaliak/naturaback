const { Router } = require('express')
const routerTransactions = Router()
const {
    controllers
} = require('../controllers/transactions.controller')
routerTransactions.get('/', controllers.get)
routerTransactions.get('/:id', controllers.getById)
routerTransactions.post('/create', controllers.create)
routerTransactions.put('/update/:id', controllers.update)
routerTransactions.put('/delete/:id', controllers.delete)

module.exports = routerTransactions
