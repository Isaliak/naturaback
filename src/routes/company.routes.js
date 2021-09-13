const { Router } = require('express')
const routerCompany = Router()
const {
    companyGet,
    companyGetById,
    companyCreate,
    companyUpdate,
    companyDelete
} = require('../controllers/company.controller')
routerCompany.get('/', companyGet)
routerCompany.get('/:id', companyGetById)
routerCompany.post('/create', companyCreate)
routerCompany.put('/update/:id', companyUpdate)
routerCompany.put('/delete/:id', companyDelete)

module.exports = routerCompany
