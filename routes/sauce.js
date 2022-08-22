// Importation packages
const express = require('express');
const router = express.Router();
// Importation modules
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const sauceCtrl = require('../controllers/sauce');


// ---------------   Routes sauces  --------------------

// Route pour renvoyer toutes les sauces de la base de données
router.get('/', auth, sauceCtrl.getAllSauces);
// // Route pour renvoyer la sauce avec l'id fourni
router.get('/:id', auth, sauceCtrl.getOneSauce);
// // Route pour créer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
// // Route pour modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// // Route pour supprimer une sauce
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);
// // Route pour Like/Dislike une sauce
router.post('/:id/like', auth, multer, sauceCtrl.likeAndDislikeSauces);

//  -----------------------------------------------------


// Exportation modules
module.exports = router;