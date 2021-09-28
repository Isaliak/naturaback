const { logCreate } = require('./log')


const validation_response = (response, call, functionName, isError, res, req) => {
    let error = ''
    call == 'get'
        ? error = 'fallo al recuperar los registros revise los datos'
        : call == 'post'
            ? error = 'fallo al realizar el registro revise los datos'
            : error = 'fallo al actualizar el registro revise los datos'

    isError
        ? (
            res.status(200).json({ response }),
            logCreate(call, functionName, 200, response.error, req)
        )
        : response != null && response.length != 0
            ? (
                res.status(200).json({ response }),
                logCreate(call, functionName, 200, response, req)
            )
            : (
                res.status(400).json({ error }),
                logCreate(call, functionName, 400, response, req)
            )
}

module.exports = { validation_response }