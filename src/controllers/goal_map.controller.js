const { request, response } = require('express')
const goal_map = require('../models').goal_map


let msg = {}
const goal_mapGet = async (req, res) => {
    try {
        const resp = await goal_map.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'No hay registros para mostrar' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const goal_mapGetById = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await goal_map.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const goal_mapCreate = async (req = request, res = response) => {
    const { name, description, gift, goal } = req.body
    try {
        const resp = await goal_map.create(
            { name, description, gift, goal, createdAt: new Date(), updatedAt: new Date() }
        )
        return (resp != null && resp.length != 0) ? res.status(201).json(resp) : res.status(201).json({ error: 'fallo al registrar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const goal_mapUpdate = async (req, res) => {
    const { id } = req.params
    const { name, description, gift, goal, state } = req.body
    try {
        const resp = await goal_map.update(
            { name, description, gift, goal, state, updatedAt: new Date() },
            { where: { ci_number: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const goal_mapDelete = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await goal_map.update(
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
    goal_mapGet,
    goal_mapGetById,
    goal_mapCreate,
    goal_mapUpdate,
    goal_mapDelete
}