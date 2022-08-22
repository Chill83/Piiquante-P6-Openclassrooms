// Importation packages
const mongoose = require('mongoose');

// Schema Sauce
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required:true},
    manufacturer: {type: String, required:true},
    description: {type: String, required:true},
    mainPepper: {type: String, required:true},
    imageUrl: {type: String, required:true},
    heat: {type: Number, required:true},
    likes: {type: Number, required:false},
    dislikes: {type: Number, required:false},
    usersLiked: {type: Array, required: false} ,
    usersDisliked: {type: Array, required:false},
});

// Exportation module du schema Sauce
module.exports = mongoose.model('Sauce', sauceSchema);