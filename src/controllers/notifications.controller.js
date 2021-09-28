const notifications = require('../models').notifications
const { response } = require('../helpers/controller_response')

const controllers = {}

controllers.get = (req, res) => {
    await response.get(notifications, 'notifications/controllers.get', req, res)
}
controllers.getById = (req, res) => {
    await response.getById(notifications, 'notifications/controllers.getById', req, res)
}
controllers.create = (req, res) => {
    const { user_id, device_token, device_type } = req.body
    await response.create(notifications, 'notifications/controllers.create', { user_id, device_token, device_type }, req, res)
}
controllers.update = (req, res) => {
    const { user_id, device_token, device_type, state } = req.body
    await response.update(notifications, 'notifications/controllers.update', { user_id, device_token, device_type, state }, req, res)
}
controllers.delete = (req, res) => {
    await response.delete(notifications, 'notifications/controllers.delete', req, res)
}

module.exports = { controllers }
