
const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user.model');



const usuariosGet = async (req, res = response) => {

    // const { tabla = 'municipios', id = 1 } = req.query;
    const { limite = 5, desde = 0, estado = true } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.find({ estado }).countDocuments(),
        Usuario.find({ estado })
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        filtrado: usuarios.length,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json({
        id,
        resto
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    
    const usuario = new Usuario( { nombre, correo, password, role } );
    
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt)

    await usuario.save();

    res.json({
        usuario
    });

    // await usuario.save( (err, user) => {
    //     if (err) return res.status(400).json({
    //         creado:false,
    //         err
    //     });
    //     res.status(201).json({
    //         creado: true,
    //         user
    //     })
    // } );

}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    
    // const userAuth = req.userAuth;

    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false } );

    res.json({
        id,
        usuario
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controller'
    });
}




module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch }