const transaction_type = require('../models').transaction_type
const { response } = require('../helpers/controller_response')

const controllers = {}
controllers.get = async (req, res) => {
    await response.get(transaction_type, 'transacctio_type/controllers.get', req, res)
}
controllers.getById = async (req, res) => {
    await response.getById(transaction_type, 'transacctio_type/controllers.getById', req, res)
}
controllers.create = async (req, res) => {
    const { name } = req.body
    await response.create(transaction_type, 'transacctio_type/controllers.create', { name }, req, res)
}
controllers.update = async (req, res) => {
    const { name } = req.body
    await response.update(transaction_type, 'transacctio_type/controllers.update', { name }, req, res)
}
controllers.delete = async (req, res) => {
    await response.delete(transaction_type, 'transacctio_type/controllers.delte', req, res)
}

module.exports = {
    controllers
}