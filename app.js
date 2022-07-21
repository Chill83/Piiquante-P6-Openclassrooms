// Importation modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importation routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connection et authentification à MongoDB (base de données)
mongoose.connect('mongodb+srv://Aymeric:projet6openclassrooms@cluster0.tr0qzir.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Initialisation variables et constantes
const app = express();

app.use(express.json());

// Configuration CORS
app.use(cors());

// Gestionnaire de routage image
app.use('/images', express.static(path.join(__dirname, 'images')));

// Configuration routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// Exportation modules
module.exports = app;