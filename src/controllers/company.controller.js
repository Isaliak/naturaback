const company = require('../models').company
const { response } = require('../helpers/controller_response')

const controllers = {}
controllers.get = async (req, res) => {
    await response.get(company, 'company/controllers.get', req, res)
}
controllers.getById = async (req, res) => {
    await response.getById(company, 'company/controllers.getById', req, res)
}
controllers.create = async (req, res) => {
    const { name, addres, phone, email, logo, web } = req.body
    await response.create(company, 'company/controllers.create', { name, addres, phone, email, logo, web }, req, res)
}
controllers.update = async (req, res) => {
    const { name, addres, phone, email, logo, web, state } = req.body
    await response.update(company, 'company/controllers.update', { name, addres, phone, email, logo, web, state }, req, res)
}
controllers.delete = async (req, res) => {
    await response.delete(company, 'company/controllers.delete', req, res)
}
module.exports = {
    controllers
}