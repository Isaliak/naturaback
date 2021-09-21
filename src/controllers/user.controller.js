const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const user = require('../models').user
const transactions = require('../models').transactions
const customer = require('../models').customer


let msg = {}
const userGet = async (req, res) => {
    console.log(user);
    try {
        const resp = await user.findAll({ //attributes: { exclude: ['ci_number'] }, 
            where: { deleted: false }
        })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar los registros revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const userGetById = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await user.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const userCreate = async (req = request, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { customer_id, username, password, rol_id } = req.body
    const salt = bcrypt.genSaltSync(10)
    try {
        const respCustomer = await customer.findOne({ where: { id: customer_id } })
        if (respCustomer != null) {
            const resp = await user.create(
                { username, password: bcrypt.hashSync(password, salt), customer_id, rol_id, createdAt: new Date(), updatedAt: new Date() }
            )
            const respTransact = await transactions.create(
                {
                    customer_id: parseInt(respCustomer.id),
                    company_id: null,
                    date: new Date(),
                    detail: 'Transaccion de mantenimiento',
                    amount: 4,
                    type: 3,
                    origin: 'no se sabe aun',
                    ip: 'no se sabe aun',
                    createdAt: new Date(), updatedAt: new Date()
                }
            )
            return (resp != null && resp.length != 0 && respTransact != null && respTransact.length != 0)
                ? res.status(201).json({ "Usuario": resp, "Transaccion": respTransact })
                : res.status(400).json({ error: 'fallo al registrar el registro revise los datos' })
        }
        else {
            return res.status(400).json({ error: 'fallo al realizar el registro revise los datos' })
        }
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const userUpdate = async (req, res) => {
    const { id } = req.params
    const { ci_number, username, password, state, rol_id } = req.body
    try {
        const resp = await user.update(
            { ci_number, username, password, state, rol_id, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const userDelete = async (req, res) => {
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
    userGet,
    userGetById,
    userCreate,
    userUpdate,
    userDelete
}