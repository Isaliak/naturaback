const transactions = require('../models').transactions


const calculadora = async (id) => {
    const resp = await transactions.findAll({
        where: { customer_id: id },
    })

    let acumulado = 0
    let redimido = 0
    let mantenimiento = 0
    let respuesta = 0
    if (Array.isArray(resp) && resp.length !== 0) {
        //suma todas las transacciones de tipo acumulacion y resta las demas al monto
        resp.forEach(transact => {
            transact.type == 1
                ? acumulado = acumulado + transact.amount
                : acumulado = acumulado - transact.amount
            transact.type == 2
                ? redimido = redimido + parseInt(transact.amount)
                : redimido = redimido
            transact.type == 3
                ? mantenimiento = mantenimiento + parseInt(transact.amount)
                : mantenimiento = mantenimiento
        })
        let monto = { acumulado, redimido, mantenimiento, respuesta }
        return monto
    } else {
        respuesta = 1
        return respuesta
    }
}


module.exports = {
    calculadora
}