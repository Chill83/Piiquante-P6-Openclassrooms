// Importation modules
const express = require('express');
const router = express.Router();

// Initialisation variables et constantes
const userCtrl = require('../controllers/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation modules
module.exports = router;