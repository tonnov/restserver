
const { request, response } = require("express");


const esAdminRole = ( req = request, res = response, next ) => {

    if ( !req.userAuth ) {
        return res.status(500).json({
            msg: 'Verificar usario desde el token'
        })
    }

    const { rol, nombre } = req.userAuth;
    if (rol!=='ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Usuario ${nombre} no tiene permisos de Administrador`
        })
    }


    next();
}


const tieneRole = (...roles) => {

    return (req, res = response, next ) => {
        
        // console.log(roles);
        if ( !req.userAuth ) {
            return res.status(500).json({
                msg: 'Verificar usario desde el token'
            })
        }
        const { role } = req.userAuth;
        // console.log(role);
        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `La operación requiere uno de los siquientes roles ${roles}`
            })
        }
        next();
    }
}


module.exports = { esAdminRole, tieneRole }