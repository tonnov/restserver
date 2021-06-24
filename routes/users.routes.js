
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/users.controller');
const { validarCampos } = require('../middlewares/validar-user');
const { esRoleValido, emailExiste, existeUserId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');


const router = Router();

router.get('/', usuariosGet );


router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUserId ),
    check('role').custom( esRoleValido ),
    check('correo', 'Correo no valido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos
], usuariosPut );


router.post('/', [
    check('nombre', 'Nombre Obligatorio').not().isEmpty(),
    check('password', 'Password Obligatorio, mas de 6 caracteres').isLength({min: 6}),
    check('correo', 'Correo no valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUserId ),
    validarCampos
], usuariosDelete )

router.patch('/', usuariosPatch)




module.exports = router;