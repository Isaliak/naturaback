const contact_center = require('../models').contact_center

const controllers = {}

controllers.get = (req, res) => {
    console.log(bottle_type);
    try {
        const resp = await contact_center.findAll({ where: { deleted: false } })
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
        const resp = await contact_center.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
controllers.create = (req, res) => {
    const { email, phone, who_we_are, what_do_we_do } = req.body
    try {
        const resp = await contact_center.create(
            { email, phone, who_we_are, what_do_we_do, createdAt: new Date(), updatedAt: new Date() }
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
    const { email, phone, who_we_are, what_do_we_do, state } = req.body
    try {
        const resp = await contact_center.update(
            { email, phone, who_we_are, what_do_we_do, state, updatedAt: new Date() },
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
        const resp = await contact_center.update(
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
