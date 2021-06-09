
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api/users';

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares(){

        this.app.use(cors());

        this.app.use( express.json() );

        this.app.use(express.static('public'));
    }

    routes() {
        
        this.app.use(this.usuariosRoute, require('../routes/users.routes'));

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Server listening at ${this.port} port`);
        })
    }

}

module.exports = Server;