const notifications = require('../models').notifications

const controllers = {}

controllers.get = (req, res) => {
    console.log(bottle_type);
    try {
        const resp = await notifications.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar los registros revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
controllers.getById = (req, res) => {
    const { id } = req.params
    try {
        const resp = await notifications.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
controllers.create = (req, res) => {
    const { user_id, device_token, device_type } = req.body
    try {
        const resp = await notifications.create(
            { user_id, device_token, device_type, createdAt: new Date(), updatedAt: new Date() }
        )
        return (resp != null && resp.length != 0) ? res.status(201).json(resp) : res.status(201).json({ error: 'fallo al realizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
controllers.update = (req, res) => {
    const { id } = req.params
    const { user_id, device_token, device_type, state } = req.body
    try {
        const resp = await notifications.update(
            { user_id, device_token, device_type, state, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
controllers.delete = (req, res) => {
    const { id } = req.params
    try {
        const resp = await notifications.update(
            { deleted: true, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al eliminar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}

module.exports = { controllers }
