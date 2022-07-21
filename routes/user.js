// Importation modules
const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
// Initialisation variables et constantes
const userCtrl = require('../controllers/user');
// Importation middleware d'authentification


// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation modules
module.exports = router;