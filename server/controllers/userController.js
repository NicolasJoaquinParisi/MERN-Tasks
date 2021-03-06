const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async(req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Validación de nombre de usuario único
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ msg: 'El email ingresado pertenece a un usuario registrado.' });
        }

        // Crear el nuevo usuario
        user = new User(req.body);

        // Hashear el password
        // El salt sirve porque en caso de varios usuarios utilicen la misma pass, el resultado del hash va a ser distinto para todos esos casos
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Guardar el usuario
        await user.save();
        
        // Crear y firmar el JWT
        const payload = {
            user: user.id
        };

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1h"
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmación
            res.json({token});
        });

    }
    catch (error) {
        console.log(error);
        res.status(400).send('Se ha producido un error');
    }
}