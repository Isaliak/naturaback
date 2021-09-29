const transactions = require('../models').transactions

const transaction_manteniance = async (customer_id, company_id = null, origin = '', ip) => {
    try {
        await transactions.create(
            {
                customer_id: parseInt(customer_id),
                company_id,
                date: new Date(),
                detail: 'Transaccion de mantenimiento',
                amount: 4,
                type: 3,
                origin,
                ip,
                createdAt: new Date(), updatedAt: new Date()
            }
        )
    } catch (error) {
        return console.log(error);
    }
}
module.exports = { transaction_manteniance }