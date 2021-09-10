const express = require('express')
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
        this.app.use('/api', require('./routes/users.routes'))
        // /api/customer/(create||update||delete)/:ci
        this.app.use('/api/customer', require('./routes/customer.routes'))
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
// new Server()

module.exports = Server