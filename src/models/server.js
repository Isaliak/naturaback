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
        this.app.use('/api', require('../routes/users.routes'))
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


module.exports = Server