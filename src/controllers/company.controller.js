const { request, response } = require('express')
const company = require('../models').company


let msg = {}
const companyGet = async (req, res) => {
    try {
        const resp = await company.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'No hay registros para mostrar' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const companyGetById = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await company.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const companyCreate = async (req = request, res = response) => {
    const { name, addres, phone, email, logo, web } = req.body
    try {
        const resp = await company.create(
            { name, addres, phone, email, logo, web, createdAt: new Date(), updatedAt: new Date() }
        )
        return (resp != null && resp.length != 0) ? res.status(201).json(resp) : res.status(201).json({ error: 'fallo al registrar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const companyUpdate = async (req, res) => {
    const { id } = req.params
    const { name, addres, phone, email, logo, web, state } = req.body
    try {
        const resp = await company.update(
            { name, addres, phone, email, logo, web, state, updatedAt: new Date() },
            { where: { ci_number: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const companyDelete = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await company.update(
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
    companyGet,
    companyGetById,
    companyCreate,
    companyUpdate,
    companyDelete
}