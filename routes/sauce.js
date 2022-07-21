// Importation modules
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

// Importation contrôleur sauce
const sauceCtrl = require('../controllers/sauce');

// ---------------   Routes sauces  --------------------

// Route pour renvoyer toutes les sauces de la base de données
router.get('/api/sauces', sauceCtrl.getAllSauces);
// Route pour renvoyer la sauce avec l'id fourni
router.get('/api/sauces/:id', sauceCtrl.getOneSauce);
// Route pour poster une sauce
router.post('/api/sauces', sauceCtrl.createSauce);
// Route pour modifier une sauce
router.put('/api/sauces/:id', sauceCtrl.modifySauce);
// Route pour supprimer une sauce
router.delete('/api/sauces/:id', sauceCtrl.deleteSauce);
// Route pour Like/Dislike une sauce
router.post('/api/sauces/:id/like', sauceCtrl.likeAndDislikeSauces);