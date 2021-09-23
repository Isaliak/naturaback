const { request, response } = require('express')
const transactions = require('../models').transactions
const { calculadora } = require('../helpers/calculator')



let msg = {}
const transactionsGet = async (req, res) => {

    try {
        const resp = await transactions.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'No hay registros para mostrar' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const transactionsGetById = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await transactions.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const transactionsCreate = async (req = request, res = response) => {
    let ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
    console.log(ip, 'ip cliente');
    const { customer_id, comapny_id, detail, type, pin, origin, amount, picture } = req.body
    try {
        //consulta el total acumulado del cliente
        const { acumulado, respuesta } = await calculadora(customer_id)
        if (type == 2 && acumulado < amount && respuesta == 0) {
            return res.status(400).json({ respuesta: 'El cliente selecionado no tiene fondos suficientes' })
        } else {
            const resp = await transactions.create(
                { customer_id, comapny_id, date: new Date(), detail, type, pin, origin, ip, amount, picture, createdAt: new Date(), updatedAt: new Date() }
            )
            return (resp != null && resp.length != 0) ? res.status(201).json(resp) : res.status(201).json({ error: 'fallo al registrar el registro revise los datos' })
        }
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const transactionsUpdate = async (req, res) => {
    let ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
    const { id } = req.params
    const { customer_id, comapny_id, date, detail, type, pin, origin, amount, picture, state } = req.body
    try {
        const resp = await transactions.update(
            { customer_id, comapny_id, date, detail, type, pin, origin, ip, amount, picture, state, updatedAt: new Date() },
            { where: { ci_number: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const transactionsDelete = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await transactions.update(
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
    transactionsGet,
    transactionsGetById,
    transactionsCreate,
    transactionsUpdate,
    transactionsDelete
}