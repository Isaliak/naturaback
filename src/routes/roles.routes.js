const { Router } = require('express');

const routerRoles = Router()
const {
    rolesGet,
    rolesGetById,
    rolesCreate,
    rolesUpdate,
    rolesDelete
} = require('../controllers/roles.controller')

routerRoles.get('/', rolesGet)
routerRoles.get('/:id', rolesGetById)
routerRoles.post('/create', rolesCreate)
routerRoles.put('/update/:id', rolesUpdate)
routerRoles.put('/delete/:id', rolesDelete)

module.exports = routerRoles