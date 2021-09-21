const transactions = require('../models').transactions


const transaction_calculator = {}

transaction_calculator.acumulacion = async (req, res) => {
    const { id } = req.params
    try {
        //consulta todas las tracsaciones del customer por su id
        const resp = await transactions.findAll({
            where: { customer_id: id },
        })
        let acumulado = 0
        let redimido = 0
        let mantenimiento = 0
        //valida qe existan transacciones
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
            //valida que el monto no sea cero ni negativo para enviar la respuesta
            return acumulado != 0 && acumulado > 0
                ? res.status(200).json({ respuesta: 'Total acumulado', acumulado, redimido, mantenimiento })
                : res.status(400).json({ respuesta: 'No tiene monto acumulado', redimido, mantenimiento })
        } else {
            return res.status(400).json({ respuesta: 'El usuario no tiene transacciones registradas' })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ erro: error, message: error.message })
    }
}



module.exports = transaction_calculator