
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api/users';

        // Conectar a base de datos
        this.database();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async database(){
        await dbConnection();
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