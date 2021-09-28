const { logCreate } = require('./log')

let msg = {}
const response = {}
response.get = async (model, functionName, req, res) => {
    try {
        const resp = await model.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0)
            ? (
                res.status(200).json(resp),
                logCreate('get', functionName, 200, resp, req)
            )
            : (
                res.status(400).json({ error: 'fallo al recuperar los registros revise los datos' }),
                logCreate('get', functionName, 400, resp, req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('get', functionName, 500, error, req)
        return res.status(500).json(msg)
    }
}
response.getById = async (model, functionName, req, res) => {
    const { id } = req.params
    try {
        const resp = await model.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0)
            ? (
                res.status(200).json(resp),
                logCreate('get', functionName, 200, resp, req)
            )
            : (
                res.status(400).json({ error: 'fallo al recuperar el registro revise los datos' }),
                logCreate('get', functionName, 400, resp, req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('get', functionName, 400, error, req)
        return res.status(500).json(msg)
    }
}
response.create = async (model, functionName, params, req, res) => {
    try {
        const resp = await model.create(params)
        return (resp != null && resp.length != 0)
            ? (
                res.status(201).json(resp),
                logCreate('post', functionName, 200, resp, req)
            )
            : (
                res.status(400).json({ error: 'fallo al realizar el registro revise los datos' }),
                logCreate('post', functionName, 400, req.body, req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('post', functionName, 500, error, req)
        return res.status(500).json({ msg })
    }
}
response.update = async (model, functionName, params, req, res) => {
    const { id } = req.params
    params.updatedAt = new Date()
    try {
        const resp = await model.update(
            params,
            { where: { id: id } })
        return (resp != null && resp != 0)
            ? (
                res.status(200).json(resp),
                logCreate('put', functionName, 201, resp, req)
            )
            : (
                res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' }),
                logCreate('put', functionName, 400, req.body, req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('put', functionName, 500, error, req)
        return res.status(500).json({ msg })
    }
}
response.delete = async (model, functionName, req, res) => {
    const { id } = req.params
    try {
        const resp = await model.update(
            { deleted: true, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0)
            ? (
                res.status(200).json(resp),
                logCreate('put', functionName, 201, resp, req)
            )
            : (
                res.status(400).json({ error: 'fallo al eliminar el registro revise los datos' }),
                logCreate('put', functionName, 400, resp, req)
            )
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        logCreate('put', functionName, 500, error, req)
        return res.status(500).json({ msg })
    }
}

module.exports = { response }