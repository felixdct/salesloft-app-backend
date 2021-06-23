const express = require('express');
const cors = require('cors');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPath = '/api'
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
    }
    
    routes() {
        this.app.use(this.apiPath, require('../controllers/api/peopleController'))
    }

    listen() {
        this.app.listen(this.port, () => console.log(`listening at port ${this.port}`))
    }
}

module.exports = Server;