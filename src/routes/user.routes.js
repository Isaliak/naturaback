const { Router } = require('express');
const { check, param } = require('express-validator');

const { validations } = require('../helpers/validations')

const routerUser = Router()
const {
    userGet,
    userGetById,
    userCreate,
    userUpdate,
    userDelete
} = require('../controllers/user.controller')

routerUser.get('/', userGet)
routerUser.get('/:id', userGetById)
routerUser.post('/create',
    [
        check('username', 'el nombre de usuario no puede estar vacio').notEmpty(),
        check('customer_id', 'el id de customer no puede estar vacio').notEmpty(),
        check('rol_id', 'el id de rol no puede estar vacio').notEmpty(),
        check('password', 'debe tener 6 caracteres como minimo').isLength({ min: 6 }),
        check('password', 'debe tener numeros, mayusculas y caracteres especiales').isStrongPassword(),
        validations,
    ],
    userCreate
)
routerUser.put('/update/:id',
    [
        param('id', 'el id de usuario no puede estar vacio').notEmpty(),
        check('username', 'el nombre de usuario no puede estar vacio').notEmpty(),
        check('customer_id', 'el id de customer no puede estar vacio').notEmpty(),
        check('rol_id', 'el id de rol no puede estar vacio').notEmpty(),
        check('password', 'debe tener 6 caracteres como minimo').notEmpty(),
        check('new_password', 'debe tener numeros, mayusculas y caracteres especiales').isStrongPassword(),
        validations,
    ],
    userUpdate
)
routerUser.put('/delete/:id', userDelete)

module.exports = routerUser