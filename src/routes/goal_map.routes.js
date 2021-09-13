const { Router } = require('express')
const routerGoal = Router()
const {
    goal_mapGet,
    goal_mapGetById,
    goal_mapCreate,
    goal_mapUpdate,
    goal_mapDelete
} = require('../controllers/goal_map.controller')
routerGoal.get('/', goal_mapGet)
routerGoal.get('/:id', goal_mapGetById)
routerGoal.post('/create', goal_mapCreate)
routerGoal.put('/update/:id', goal_mapUpdate)
routerGoal.put('/delete/:id', goal_mapDelete)

module.exports = routerGoal
