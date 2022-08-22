// Importation package password-validator
const passwordValidator = require('password-validator');

// Création schema passwordValidator
const passwordSchema = new passwordValidator();

// Attribution des règles du mot de passe
passwordSchema
.is().min(8)                                    // Longueur minimum de 8 caractères
.is().max(100)                                  // Longueur maximum de 100 caractères
.has().uppercase(1)                              // Doit contenir au moins 1 majuscule
.has().digits(1)                                // Doit contenir au moins 1 chiffre
.has().not().spaces()                           // ne doit pas contenir d'espaces
.is().not().oneOf(['Passw0rd', 'Password123', 'admin', 'azerty', '123456789']); // Valeur interdites pour le mot de passe


// Vérification du mot de passe par rapport au schema
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)) {
        next();
    }
    else {
        return res.status(400).json({ error : `le mot de passe n'est pas assez fort ${passwordSchema.validate(req.body.password, {list: true})}` })
    }
}