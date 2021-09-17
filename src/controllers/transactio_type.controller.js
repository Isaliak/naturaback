const { request, response } = require('express')
const transaction_type = require('../models').transaction_type


let msg = {}
const transaction_typeGet = async (req, res) => {
    console.log(transaction_type);
    try {
        const resp = await transaction_type.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar los registros revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const transaction_typeGetById = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await transaction_type.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const transaction_typeCreate = async (req = request, res = response) => {
    const { name } = req.body
    try {
        const resp = await transaction_type.create(
            { name, createdAt: new Date(), updatedAt: new Date() }
        )
        return (resp != null && resp.length != 0) ? res.status(201).json(resp) : res.status(201).json({ error: 'fallo al registrar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const transaction_typeUpdate = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
        const resp = await transaction_type.update(
            { name, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const transaction_typeDelete = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await transaction_type.update(
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
    transaction_typeGet,
    transaction_typeGetById,
    transaction_typeCreate,
    transaction_typeUpdate,
    transaction_typeDelete
}