const { calculadora } = require('../helpers/calculator')

const transaction_calculator = {}

transaction_calculator.acumulacion = async (req, res) => {
    const { id } = req.params
    try {
        const { acumulado, redimido, mantenimiento, respuesta } = await calculadora(id)
        console.log(respuesta, 'es respuesta')
        if (respuesta == 0) {
            //valida que el monto no sea cero ni negativo para enviar la respuesta
            return acumulado != 0 && acumulado > 0
                ? res.status(200).json({ respuesta: 'Total acumulado', acumulado, redimido, mantenimiento })
                : res.status(400).json({ respuesta: 'No tiene monto acumulado', redimido, mantenimiento })
        }
        else {
            return res.status(400).json({ respuesta: 'El usuario no tiene transacciones registradas' })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ erro: error, message: error.message })
    }
}



module.exports = transaction_calculator