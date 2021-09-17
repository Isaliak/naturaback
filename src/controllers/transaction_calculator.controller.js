const transactions = require('../models').transactions
const user = require('../models').user
const customer = require('../models').customer


const transaction_calculator = {}
transaction_calculator.acumulacion = async (req, res) => {

    const { ci } = req.params
    const resp = await customer.findAll({ where: { ci_number: ci }, include: [{ model: user }] })
    console.log(resp);

}
transaction_calculator.redencion = (req, resp) => {

}


module.exports = transaction_calculator