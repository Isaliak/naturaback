const roles = require('../models').roles
const { response } = require('../helpers/controller_response')

const controllers = {}
controllers.get = async (req, res) => {
    await response.get(roles, 'roles/controlers.get', req, res)
}
controllers.getById = async (req, res) => {
    await response.getById(roles, 'roles/controlers.get', req, res)
}
controllers.create = async (req, res) => {
    const { rolename } = req.body
    await response.create(roles, 'roles/controlers.get', { rolename }, req, res)
}
controllers.update = async (req, res) => {
    const { rolename } = req.body
    await response.update(roles, 'roles/controlers.get', { rolename }, req, res)
}
controllers.delete = async (req, res) => {
    await response.delete(roles, 'roles/controlers.get', req, res)
}
module.exports = {
    controllers
}