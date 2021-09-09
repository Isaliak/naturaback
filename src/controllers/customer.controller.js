const customer = require('../models').customer


let msg = {}
const erroMsg = (error, message, status = 500) => {
    msg = { 'error': error, 'msg': message }
    console.log(msg);
    res.status(status).json({ msg })
}
const customerGet = async (req, res) => {
    try {
        const resp = await customer.findAll({ where: { deleted: false } })
        return (resp != null) ? res.status(200).json({ resp }) : erroMsg('fallo', 'no se encontro ningun registro', 400)
    } catch (error) {
        return erroMsg(error, error.message)
    }
}
const customerGetByCi = async (req, res) => {
    const { ci_number } = req.params
    try {
        const resp = await customer.findAll({ where: { deleted: false, ci_number: ci_number } })
        return (resp != null) ? res.status(200).json({ resp }) : erroMsg('fallo', 'no se encontro ningun registro', 400)
    } catch (error) {
        return erroMsg(error, error.message)
    }
}
const customerCreate = async (req, res) => {
    const { name, lastName, email, ci_number, birth_date, phone, deleted = false, state = true } = req.body
    try {
        const resp = await customer.create(
            { name, lastName, email, ci_number, birth_date, phone }
        )
        return (resp != null) ? res.status(201).json({ resp }) : erroMsg('fallo', 'no se inserto ningun registro', 400)
    } catch (error) {
        return erroMsg(error, error.message)
    }
}
const customerUpdate = async (req, res) => {
    const { ci } = req.params
    const { name, lastName, email, ci_number, birth_date, phone, state = true } = req.body
    try {
        const resp = await customer.update(
            { name, lastName, email, ci_number, birth_date, phone, state },
            { where: { ci_number: ci } })
        return (resp != null) ? res.status(201).json({ resp }) : erroMsg('fallo', 'no se actualizo ningun registro', 400)
    } catch (error) {
        return erroMsg(error, error.message)
    }
}
const customerDelete = async (req, res) => {
    const { ci } = req.params
    try {
        const resp = await customer.update(
            { deleted: true },
            { where: { ci_number: ci } })
        return (resp != null) ? res.status(201).json({ resp }) : erroMsg('fallo', 'no se actualizo ningun registro', 400)
    } catch (error) {
        return erroMsg(error, error.message)
    }
}




module.exports = {
    customerGet,
    customerGetByCi,
    customerCreate,
    customerUpdate,
    customerDelete
}