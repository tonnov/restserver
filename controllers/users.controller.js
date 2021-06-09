
const { response } = require('express');


const usuariosGet = (req, res = response) => {

    const { tabla = 'municipios', id = 1 } = req.query;

    res.json({
        msg: 'get API - controller',
        tabla,
        id
    });
}

const usuariosPut = (req, res = response) => {
    
    const { id } = req.params;

    const body = req.body;

    res.json({
        msg: 'put API - controller', 
        id,
        body
    });
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad } = req.body;

    res.json({
        msg: 'post API - controller',
        nombre, edad
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controller'
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controller'
    });
}





module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch }