const log = require('../models').log
const { getIp } = require('./getIp')

const logCreate = async (type, call, functionName, message, cod_resp, parameters, req) => {
    let msg = {}
    try {
        await log.create(
            { type, call, functionName, message, cod_resp, parameters, ip: getIp(req), createdAt: new Date(), updatedAt: new Date() }
        )
        /// codigo de respuesta para los controladores

    } catch (error) {
        // msg = { 'error': error, 'msg': error.message }
        console.log(error);
    }
}


module.exports = { logCreate }