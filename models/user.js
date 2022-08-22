// Importation packages
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});

// Attribution du plugin uniqueValidator au schema User
userSchema.plugin(uniqueValidator);

// Exportation modèle User
module.exports = mongoose.model('User', userSchema);