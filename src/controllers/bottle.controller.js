// const { request, response } = require('express')
const bottle_type = require('../models').bottle_type
const { response } = require('../helpers/controller_response')

const controllers = {}
controllers.get = async (req, res) => {
    await response.get(bottle_type, 'bottle/controllers.get', req, res)
}
controllers.getById = async (req, res) => {
    await response.getById(bottle_type, 'bottle/controllers.getById', req, res)
}
controllers.create = async (req, res) => {
    const { name, value } = req.body
    await response.create(bottle_type, 'bottle/controllers.create', { name, value }, req, res)
}
controllers.update = async (req, res) => {
    const { name, value, state } = req.body
    await response.update(bottle_type, 'bottle/controllers.update', { name, value, state }, req, res)
}
controllers.delete = async (req, res) => {
    await response.delete(bottle_type, 'bottle/controllers.delete', req, res)
}
module.exports = {
    controllers
}