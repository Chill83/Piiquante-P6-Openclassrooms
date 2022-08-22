// Importation packages
const express = require('express');
const router = express.Router();
// Importation modules
const userCtrl = require('../controllers/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation modules
module.exports = router;