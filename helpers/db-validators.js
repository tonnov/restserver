
const Role = require('../models/user-roles');
const Usuario = require('../models/user.model');

const esRoleValido = async ( role = '' ) => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no existe en la BD`)
    }
}

const emailExiste = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya existe en la BD`)
    }
}

const existeUserId = async ( id ) => {
    const existeID = await Usuario.findById( id );
    if (!existeID) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
}





module.exports = { esRoleValido, emailExiste, existeUserId }