const transactions = require('../models').transactions
const { calculadora } = require('../helpers/calculator')
const { getIp } = require('../helpers/getIp')
const { response } = require('../helpers/controller_response')



const controllers = {}
controllers.get = async (req, res) => {
    await response.get(transactions, 'transactions/controllers.get', req, res)
}
controllers.getById = async (req, res) => {
    await response.getById(transactions, 'transactions/controllers.getById', req, res)
}
controllers.create = async (req, res) => {
    let ip = getIp(req);
    const { customer_id, comapny_id, date, detail, type, pin, origin, amount, picture } = req.body
    try {
        //consulta el total acumulado del cliente
        const { acumulado, respuesta } = await calculadora(customer_id)
        return (type == 2 && acumulado < amount && respuesta == 0)
            ? res.status(400).json({ respuesta: 'El cliente selecionado no tiene fondos suficientes' })
            : await response.create(transactions, 'transactions/controllers.create', { customer_id, comapny_id, date, detail, type, pin, origin, amount, picture, ip }, req, res)
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
controllers.update = async (req, res) => {
    let ip = getIp(req);
    const { customer_id, comapny_id, date, detail, type, pin, origin, amount, picture, state } = req.body
    await response.update(transactions, 'transactions/controllers.update', { customer_id, comapny_id, date, detail, type, pin, origin, amount, picture, ip, state }, req, res)
}
controllers.delete = async (req, res) => {
    await response.delete(transactions, 'transactions/controllers.delete', req, res)
}
module.exports = {
    controllers
}