const { Router } = require('express');
const { check } = require('express-validator');

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
    check('username', 'el nombre de usuario no puede estar vacio').notEmpty(),
    check('cutomer_id', 'el id de customer no puede estar vacio').notEmpty(),
    check('rol_id', 'el id de rol no puede estar vacio').notEmpty(),
    check('password', 'debe tener 6 caracteres como minimo').isLength({ min: 6 })
        .matches('^[0-9a-zA-Z ]+$'),
    userCreate
)
routerUser.put('/update/:id', userUpdate)
routerUser.put('/delete/:id', userDelete)

module.exports = routerUser