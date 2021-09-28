const goal_map = require('../models').goal_map
const { response } = require('../helpers/controller_response')

const controllers = {}
controllers.get = async (req, res) => {
    await response.get(goal_map, 'goal_map/controllers.get', req, res)
}
controllers.getById = async (req, res) => {
    await response.getById(goal_map, 'goal_map/controllers.getById', req, res)
}
controllers.create = async (req, res) => {
    const { name, description, gift, goal } = req.body
    await response.create(goal_map, 'goal_map/controllers.create', { name, description, gift, goal }, req, res)
}
controllers.update = async (req, res) => {
    const { name, description, gift, goal, state } = req.body
    await response.update(goal_map, 'goal_map/controllers.create', { name, description, gift, goal, state }, req, res)
}
controllers.delete = async (req, res) => {
    await response.delete(goal_map, 'goal_map/controllers.delete', req, res)
}
module.exports = {
    controllers
}