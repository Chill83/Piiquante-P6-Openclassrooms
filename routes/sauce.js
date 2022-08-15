// Importation modules
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

// Importation contrôleur sauce
const sauceCtrl = require('../controllers/sauce');

// ---------------   Routes sauces  --------------------

// Route pour renvoyer toutes les sauces de la base de données
router.get('/', auth, sauceCtrl.getAllSauces);
// // Route pour renvoyer la sauce avec l'id fourni
router.get('/:id', auth, sauceCtrl.getOneSauce);
// // Route pour poster une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
// // Route pour modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// // Route pour supprimer une sauce
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);
// // Route pour Like/Dislike une sauce
router.post('/:id/like', auth, multer, sauceCtrl.likeAndDislikeSauces);

module.exports = router;