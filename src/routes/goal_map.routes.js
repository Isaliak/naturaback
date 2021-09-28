const { Router } = require('express')
const routerGoal = Router()
const {
    controllers
} = require('../controllers/goal_map.controller')
routerGoal.get('/', controllers.get)
routerGoal.get('/:id', controllers.getById)
routerGoal.post('/create', controllers.create)
routerGoal.put('/update/:id', controllers.update)
routerGoal.put('/delete/:id', controllers.delete)

module.exports = routerGoal
