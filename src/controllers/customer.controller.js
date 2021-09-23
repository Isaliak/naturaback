const { request, response } = require('express')
const customer = require('../models').customer


let msg = {}
const customerGet = async (req, res) => {
    try {
        const resp = await customer.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0) ? res.status(200).json({ resp }) : res.status(201).json({ error: 'fallo al recuperar los registros revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const customerGetByCi = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await customer.findAll({ where: { deleted: false, ci_number: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json({ resp }) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const customerCreate = async (req = request, res = response) => {
    const { name, lastName, email, ci_number, birth_date, phone } = req.body
    try {
        const emailExist = customer.finOne({ where: { email } })
        if (emailExist) {
            return res.status(400).json({ respuesta: 'el email ya esta en uso' })
        }
        const resp = await customer.create(
            { name, lastName, email, ci_number, birth_date, phone, createdAt: new Date(), updatedAt: new Date() }
        )
        return (resp != null && resp.length != 0) ? res.status(201).json({ resp }) : res.status(201).json({ error: 'fallo al registrar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const customerUpdate = async (req, res) => {
    const { id } = req.params
    const { name, lastName, email, ci_number, birth_date, phone, state = true } = req.body
    try {
        const resp = await customer.update(
            { name, lastName, email, ci_number, birth_date, phone, state, updatedAt: new Date() },
            { where: { ci_number: id } })
        return (resp != null && resp != 0) ? res.status(201).json({ resp }) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const customerDelete = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await customer.update(
            { deleted: true, updatedAt: new Date() },
            { where: { ci_number: id } })
        return (resp != null && resp != 0) ? res.status(201).json({ resp }) : res.status(400).json({ error: 'fallo al eliminar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
module.exports = {
    customerGet,
    customerGetByCi,
    customerCreate,
    customerUpdate,
    customerDelete
}