// Importation modules
const express = require('express');
const mongoose = require('mongoose');

// Importation route
const userRoutes = require('./routes/user');

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
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Configuration routes
app.use('/api/auth', userRoutes);

// Exportation modules
module.exports = app;