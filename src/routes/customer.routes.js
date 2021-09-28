const { Router } = require('express')
const { check, param } = require('express-validator')
const { validations } = require('../helpers/validations')
const router = Router()
const {
    controllers
} = require('../controllers/customer.controller')
router.get('/', controllers.get)
router.get('/:id', controllers.getById)
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
    controllers.create)
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
    controllers.update)
router.put('/delete/:id', controllers.delete)

module.exports = router
