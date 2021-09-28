const contact_center = require('../models').contact_center
const { response } = require('../helpers/controller_response')

const controllers = {}
controllers.get = (req, res) => {
    await response.get(contact_center, 'contact_center/controllers.get', req, res)
}
controllers.getById = (req, res) => {
    await response.getById(contact_center, "contact_center/controllers.getById", req, res)
}
controllers.create = (req, res) => {
    const { email, phone, who_we_are, what_do_we_do } = req.body
    await response.create(contact_center, 'contact_center/controllers.create', { email, phone, who_we_are, what_do_we_do }, req, res)
}
controllers.update = (req, res) => {
    const { email, phone, who_we_are, what_do_we_do, state } = req.body
    await response.update(contact_center, 'contact_center/controllers.update', { email, phone, who_we_are, what_do_we_do, state }, req, res)
}
controllers.delete = (req, res) => {
    await response.delete(contact_center, 'contact_center/controllers.delete', req, res)
}

module.exports = { controllers }
