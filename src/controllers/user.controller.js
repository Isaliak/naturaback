const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const user = require('../models').user
const transactions = require('../models').transactions
const customer = require('../models').customer

const salt = bcrypt.genSaltSync(10)
let msg = {}
const userGet = async (req, res) => {
    // let ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
    try {
        // console.log(ip, 'ip cliente');
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
    const { customer_id, username, password, rol_id, origin } = req.body
    let ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
    console.log(ip, 'ip cliente');
    try {
        const userExist = await user.findOne({ where: { username } })
        const userExistCustomerId = await user.findOne({ where: { customer_id } })
        const respCustomer = await customer.findOne({ where: { id: customer_id } })
        if (respCustomer != null) {
            if (userExistCustomerId == null) {
                if (userExist !== null) {
                    return res.status(400).json({ respuesta: 'el nombre de usuario ya esta en uso' })
                }
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
                        origin,
                        ip,
                        createdAt: new Date(), updatedAt: new Date()
                    }
                )
                return (resp != null && resp.length != 0 && respTransact != null && respTransact.length != 0)
                    ? res.status(201).json({ "Usuario": resp, "Transaccion": respTransact })
                    : res.status(400).json({ error: 'fallo al registrar el registro revise los datos' })
            }
            else {
                return res.status(400).json({ error: 'el cliente ya tiene un usuario registrado' })

            }
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