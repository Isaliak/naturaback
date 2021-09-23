const { Router } = require('express')
const { check, param } = require('express-validator')
const { validations } = require('../helpers/validations')
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
routerCompany.post('/create',
    [
        check('name', 'el nombre no puede estar vacio').notEmpty(),
        check('addres', 'la direccion no puede estar vacio').notEmpty(),
        check('web', 'debe ser un url valido').isURL(),
        check('phone', 'el numero telefonico no puede estar vacio').notEmpty().isNumeric(),
        check('email', 'el email debe ser valido').isEmail(),
        validations,
    ],
    companyCreate)
routerCompany.put('/update/:id',
    [
        param('id', 'el id no puede estar vacio').notEmpty(),
        check('name', 'el nombre no puede estar vacio').notEmpty(),
        check('addres', 'la direccion no puede estar vacio').notEmpty(),
        check('web', 'debe ser un url valido').isURL(),
        check('phone', 'el numero telefonico no puede estar vacio').notEmpty().isNumeric(),
        check('email', 'el email debe ser valido').isEmail(),
        validations,
    ],
    companyUpdate)
routerCompany.put('/delete/:id', companyDelete)

module.exports = routerCompany
