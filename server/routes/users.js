// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// Crea un usuario
// api/users
router.post('/', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'The password must contains at least 6 characters').isLength({min: 6})
    ],
    userController.createUser
);

module.exports = router;