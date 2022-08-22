// Importation package multer
const multer = require('multer');

// Gestion différents formats d'images
const MIME_TYPES = {
    'image.jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// Gestion du stockage disque des images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportation module Multer
module.exports = multer({ storage }).single('image');