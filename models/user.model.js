

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema ({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },

    // phone: {
    //     type: String,
    //     validate: {
    //       validator: function(v) {
    //         return /\d{3}-\d{3}-\d{4}/.test(v);
    //       },
    //       message: props => `${props.value} is not a valid phone number!`
    //     },
    //     required: [true, 'User phone number required']
    // },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'El rol es requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario } = this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);