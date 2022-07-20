// Importation modules
const express = require('express');
const mongoose = require('mongoose');
// Initialisation variables
const app = express();

// Connection et authentification à MongoDB (base de données)
mongoose.connect('mongodb+srv://Aymeric:projet6openclassrooms@cluster0.tr0qzir.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//  Fonction test afin de vérifier si le serveur fonctionne
app.use((req,res) => {
    res.json({message: "Votre requête a bien été reçue !"});
});


// Exportation modules
module.exports = app;