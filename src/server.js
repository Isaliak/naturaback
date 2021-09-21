const express = require('express')
const { body, validationResult } = require('express-validator');
const cors = require("cors");
const { Router } = require('express');

class Server {
    constructor() {
        this.app = express()
        this.router = Router()
        this.port = process.env.PORT || 8000
        this.middlewares()
        this.routes()
        this.listen()
    }
    routes() {
        // /api/user/(create||update||delete)/:ci
        this.app.use('/api/users', require('./routes/user.routes'))
        // /api/customer/(create||update||delete)/:ci
        this.app.use('/api/customer', require('./routes/customer.routes'))
        // /api/roles/(create||update||delete)/:ci
        this.app.use('/api/roles', require('./routes/roles.routes'))
        // /api/company/(create||update||delete)/:ci
        this.app.use('/api/company', require('./routes/company.routes'))
        // /api/goal_map/(create||update||delete)/:ci
        this.app.use('/api/goal_map', require('./routes/goal_map.routes'))
        // /api/transactions/(create||update||delete)/:ci
        this.app.use('/api/transactions', require('./routes/transactions.routes'))
        // /api/bottle/(create||update||delete)/:ci
        this.app.use('/api/bottle', require('./routes/bottle.routes'))
        // /api/transaction_type/(create||update||delete)/:ci
        this.app.use('/api/transaction_type', require('./routes/transaction_type.routes'))
        // /api/transaction_calculator/(acumulacion||redencion)/:ci
        this.app.use('/api/transaction_calculator', require('./routes/transaction_calculator.routes'))
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json())
        this.app.use(express.raw())
        // this.app.use('/src', express.static('./src'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server runing in http://localhost:${this.port}`);
        });
    }
}

module.exports = Server