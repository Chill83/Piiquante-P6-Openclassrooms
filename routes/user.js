// Importation packages
const express = require('express');
const router = express.Router();
// Importation modules
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middlewares/password-validator');

// Routes
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation modules
module.exports = router;