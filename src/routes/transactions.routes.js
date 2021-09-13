const { Router } = require('express')
const routerTransactions = Router()
const {
    transactionsGet,
    transactionsGetById,
    transactionsCreate,
    transactionsUpdate,
    transactionsDelete
} = require('../controllers/transactions.controller')
routerTransactions.get('/', transactionsGet)
routerTransactions.get('/:id', transactionsGetById)
routerTransactions.post('/create', transactionsCreate)
routerTransactions.put('/update/:id', transactionsUpdate)
routerTransactions.put('/delete/:id', transactionsDelete)

module.exports = routerTransactions
