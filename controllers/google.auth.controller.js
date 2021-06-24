
const { response, request } = require('express');
const { googleVerify } = require('../helpers/google-verify');
const { generarJWT } = require('../helpers/generar-jwt')

const Usuario = require('../models/user.model');


const googleAuth = (req = request, res = response) => {
    const ruta = process.cwd() + '/public/google-sign.html';
    res.sendFile(ruta)
}

const googleSignin = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify ( id_token );
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: '-',
                img,
                google: true
            }
            usuario = new Usuario( data );
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                err: 'Usuario no autorizado, hable con el admin, invitele un café'
            })
        }
        
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no valido'
        })
    }

}



module.exports = { googleAuth, googleSignin }