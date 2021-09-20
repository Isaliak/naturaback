const transactions = require('../models').transactions


const transaction_calculator = {}
transaction_calculator.acumulacion = async (req, res) => {
    const { id } = req.params
    try {
        //consulta todas las tracsaciones del customer por su id
        const resp = await transactions.findAll({
            where: { customer_id: id },
        })
        let amount = 0
        //valida qe existan transacciones
        if (Array.isArray(resp) && resp.length !== 0) {
            //suma todas las transacciones de tipo acumulacion y resta las demas al monto
            resp.forEach(transact => {
                return transact.type == 1 ? amount = amount + transact.amount : amount = amount - transact.amount
            })
            //valida que el monto no sea cero ni negativo para enviar la respuesta
            amount != 0 && amount > 0
                ? res.status(200).json({ respuesta: 'Total acumulado', amount })
                : res.status(400).json({ respuesta: 'No tiene monto acumulado' })
        } else {
            res.status(400).json({ respuesta: 'El usuario no tiene transacciones registradas' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ erro: error, message: error.message })
    }


}
transaction_calculator.redencion = (req, resp) => {

}


module.exports = transaction_calculator