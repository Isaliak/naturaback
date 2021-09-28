const log = require('../models').log
const { getIp } = require('./getIp')

const logCreate = async (call, functionName, cod_resp, parameters, req) => {
    try {

        await log.create(
            {
                type: cod_resp == 400 ? 'error' : cod_resp == 500 ? 'faltalError' : 'successful',
                call,
                functionName,
                message: cod_resp == 400 ? 'failed' : cod_resp == 500 ? JSON.stringify(parameters.message) : 'success',
                cod_resp,
                parameters: JSON.stringify(parameters),
                ip: getIp(req),
                createdAt: new Date(), updatedAt: new Date()
            }
        )
    } catch (error) { return console.log(error); }
}


module.exports = { logCreate }