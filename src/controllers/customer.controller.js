const customer = require('../models').customer
const { response } = require('../helpers/controller_response')

const controllers = {}
controllers.get = async (req, res) => {
    await response.get(customer, 'customer/controllers.get', req, res)
}
controllers.getById = async (req, res) => {
    await response.getById(customer, 'customer/controllers.getById', req, res)
}
controllers.create = async (req, res) => {
    const { name, lastName, email, ci_number, birth_date, phone } = req.body
    await response.create(customer, 'customer/controllers.create', { name, lastName, email, ci_number, birth_date, phone }, req, res)
}
controllers.update = async (req, res) => {
    const { name, lastName, email, ci_number, birth_date, phone, state = true } = req.body
    await response.update(customer, 'customer/controllers.create', { name, lastName, email, ci_number, birth_date, phone }, req, res)
}
controllers.delete = async (req, res) => {
    await response.delete(customer, 'customer/controllers.delete', req, res)
}
module.exports = {
    controllers
}