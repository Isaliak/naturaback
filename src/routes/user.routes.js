const { Router } = require('express');

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
routerUser.post('/create', userCreate)
routerUser.put('/update/:id', userUpdate)
routerUser.put('/delete/:id', userDelete)

module.exports = routerUser