const bcrypt = require('bcryptjs')
const user = require('../models').user
const transactions = require('../models').transactions
const customer = require('../models').customer

const { response } = require('../helpers/controller_response')
const { transaction_manteniance } = require('../helpers/transaction_manteniance')
const { getIp } = require('../helpers/getIp')

const salt = bcrypt.genSaltSync(10)
const controllers = {}

controllers.get = async (req, res) => {
    await response.get(user, 'user/controllers.get', req, res)
}
controllers.getById = async (req, res) => {
    await response.getById(user, 'user/controllers.getById', req, res)
}
controllers.create = async (req, res) => {
    const { customer_id, username, password, rol_id } = req.body
    let ip = getIp(req)
    try {
        const userExist = await user.findOne({ where: { username } })
        const userExistCustomerId = await user.findOne({ where: { customer_id } })
        const respCustomer = await customer.findOne({ where: { id: customer_id } })
        if (respCustomer == null) {
            return res.status(400).json({ error: 'fallo al realizar el registro revise los datos' })
        }
        if (userExistCustomerId != null) {
            return res.status(400).json({ error: 'el cliente ya tiene un usuario registrado' })
        }
        if (userExist !== null) {
            return res.status(400).json({ respuesta: 'el nombre de usuario ya esta en uso' })
        }
        await response.create(user, 'user/controllers.create', { username, password: bcrypt.hashSync(password, salt), customer_id, rol_id }, req, res)
        await transaction_manteniance(respCustomer.id, null, '', ip)
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
controllers.update = async (req, res) => {
    const { id } = req.params
    const { ci_number, username, password, new_password, state, rol_id } = req.body
    const validate_password = await user.findOne({ where: { id } })
    let pass_compare = false
    try {
        validate_password != null ? pass_compare = bcrypt.compareSync(password, validate_password.password) : pass_compare
        if (pass_compare) {
            if (new_password != password) {
                console.log({ new_password });
                const resp = await user.update(
                    { ci_number, username, password: bcrypt.hashSync(new_password, salt), state, rol_id, updatedAt: new Date() },
                    { where: { id: id } })
                return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
            }
            else {
                return res.status(201).json({ respuesta: 'La nueva contraseña no puede ser igual que la anterior' })
            }
        }
        else {
            return res.status(400).json({ respuesta: 'La contraseña o el id usuario esta incorrecto ' })
        }
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
controllers.delete = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await user.update(
            { deleted: true, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al eliminar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
module.exports = {
    controllers
}