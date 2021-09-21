
const { request, response } = require('express')
const transactions = require('../models').transactions



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
    const { customer_id, comapny_id, detail, type, pin, origin, ip, amount, picture } = req.body
    try {
        const resp_transact = await transactions.findAll({
            where: { customer_id: customer_id },
        })
        let resp_amount = 0
        //valida qe existan transacciones
        if (Array.isArray(resp_transact) && resp_transact.length !== 0) {
            //suma todas las transacciones de tipo acumulacion y resta las demas al monto
            resp_transact.forEach(transact => {
                return transact.type == 1
                    ? resp_amount = resp_amount + transact.amount
                    : resp_amount = resp_amount - transact.amount
            })
        }
        if (type == 2 && resp_amount < amount) {
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
    const { id } = req.params
    const { customer_id, comapny_id, date, detail, type, pin, origin, ip, amount, picture, state } = req.body
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