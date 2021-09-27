const { request, response } = require('express')
const bottle_type = require('../models').bottle_type
const { logCreate } = require('../helpers/log')

let msg = {}
const bottleGet = async (req, res) => {
    console.log(bottle_type);
    try {
        const resp = await bottle_type.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0)
            ? (
                logCreate('successful', 'get', 'bottleGet', 'successful', 200, JSON.stringify(resp), req),
                res.status(200).json(resp)
            )
            : (
                logCreate('successful', 'get', 'bottleGet', 'failed', 400, JSON.stringify(resp), req),
                res.status(400).json({ error: 'fallo al recuperar el registro revise los datos' })
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('successful', 'get', 'bottleGet', JSON.stringify(msg), 500, JSON.stringify(error), req)
        return res.status(500).json(msg)
    }
}
const bottleGetById = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await bottle_type.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0)
            ? (
                res.status(200).json(resp),
                logCreate('successful', 'get', 'bottleGetById', 'successful', 200, JSON.stringify(resp), req)
            )
            : (
                res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' }),
                logCreate('error', 'get', 'bottleGetById', 'failed', 400, JSON.stringify(resp), req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('error', 'get', 'bottleGetById', JSON.stringify(msg), 400, JSON.stringify(error), req)
        return res.status(500).json({ msg })
    }
}
const bottleCreate = async (req = request, res = response) => {
    const { name, value } = req.body
    try {
        const resp = await bottle_type.create(
            { name, value, createdAt: new Date(), updatedAt: new Date() }
        )
        return (resp != null && resp.length != 0)
            ? (
                res.status(201).json(resp),
                logCreate('successful', 'post', 'bottleCreate', 'successful', 201, JSON.stringify(resp), req)
            )
            : (
                res.status(201).json({ error: 'fallo al realizar el registro revise los datos' }),
                logCreate('error', 'post', 'bottleCreate', 'failed', 400, JSON.stringify(resp), req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('error', 'post', 'bottleCreate', JSON.stringify(msg), 500, JSON.stringify(error), req)
        return res.status(500).json({ msg })
    }
}
const bottleUpdate = async (req, res) => {
    const { id } = req.params
    const { name, value, state } = req.body
    try {
        const resp = await bottle_type.update(
            { name, value, state, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0)
            ? (
                res.status(201).json(resp),
                logCreate('successful', 'put', 'bottleUpdate', 'successful', 201, JSON.stringify(resp), req)
            )
            : (
                res.status(201).json({ error: 'fallo al actualizar el registro revise los datos' }),
                logCreate('error', 'put', 'bottleUpdate', 'failed', 400, JSON.stringify(resp), req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('error', 'put', 'bottleUpdate', JSON.stringify(msg), 500, JSON.stringify(error), req)
        return res.status(500).json({ msg })
    }
}
const bottleDelete = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await bottle_type.update(
            { deleted: true, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0)
            ? (
                res.status(201).json(resp),
                logCreate('successful', 'put', 'bottleDelete', 'successful', 201, JSON.stringify(resp), req)
            )
            : (
                res.status(201).json({ error: 'fallo al eliminar el registro revise los datos' }),
                logCreate('error', 'put', 'bottleDelete', 'failed', 400, JSON.stringify(resp), req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('error', 'put', 'bottleDelete', JSON.stringify(msg), 500, JSON.stringify(error), req)
        return res.status(500).json({ msg })
    }
}
module.exports = {
    bottleGet,
    bottleGetById,
    bottleCreate,
    bottleUpdate,
    bottleDelete
}