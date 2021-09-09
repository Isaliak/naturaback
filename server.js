const express = require('express')
const cors = require("cors");

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8000
        this.routes()
        this.middlewares()
        this.listen()
    }

    routes() {
        this.app.use('/api', require('./src/routes/users.routes'))
        this.app.use('/api/customer', require('./src/routes/customer.routes'))
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json())

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server runing in http://localhost:${this.port}`);
        });
    }
}
// new Server()

module.exports = Server