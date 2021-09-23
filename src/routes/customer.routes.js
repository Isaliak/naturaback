const { Router } = require('express')
const { check, param } = require('express-validator')
const { validations } = require('../helpers/validations')
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
router.post('/create',
    [
        check('name', 'el nombre no puede estar vacio').notEmpty(),
        check('lastName', 'el apellido no puede estar vacio').notEmpty(),
        check('ci_number', 'el numero de carnet no puede estar vacio, ni incompleto').notEmpty().isLength({ min: 7, max: 7 }),
        check('birth_date', 'a fecha de nacimiento no puede estar vacio').notEmpty().isDate(),
        check('phone', 'el numero telefonico no puede estar vacio').notEmpty().isNumeric(),
        check('email', 'el email debe ser valido').isEmail(),
        validations,
    ],
    customerCreate)
router.put('/update/:id',
    [
        param('id', 'debe colocar un id valido').notEmpty(),
        check('name', 'el nombre no puede estar vacio').notEmpty(),
        check('lastName', 'el apellido no puede estar vacio').notEmpty(),
        check('ci_number', 'el numero de carnet no puede estar vacio, ni incompleto').notEmpty().isLength({ min: 7, max: 7 }),
        check('birth_date', 'a fecha de nacimiento no puede estar vacio').notEmpty().isDate(),
        check('phone', 'el numero telefonico no puede estar vacio').notEmpty().isNumeric(),
        check('email', 'el email debe ser valido').isEmail(),
        validations,
    ],
    customerUpdate)
router.put('/delete/:id', customerDelete)

module.exports = router
