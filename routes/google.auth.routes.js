

const { Router } = require('express');
const { check } = require('express-validator');
const { googleAuth, googleSignin } = require('../controllers/google.auth.controller');
const { validarCampos } = require('../middlewares/validar-user');

const router = Router();

// router.get('/', usuariosGet );
router.get('/', googleAuth );

router.post('/',[
    check('id_token','El id token es necesario').notEmpty(),
    validarCampos
], googleSignin )

module.exports = router;