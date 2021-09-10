const { request, response } = require('express')
const user = require('../models').user


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
    const { ci_number, username, password, rol_id } = req.body
    try {
        const resp = await user.create(
            { ci_number, username, password, rol_id }
        )
        return (resp != null && resp.length != 0) ? res.status(201).json(resp) : res.status(201).json({ error: 'fallo al registrar el registro revise los datos' })
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
            { ci_number, username, password, state, rol_id },
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
            { deleted: true },
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