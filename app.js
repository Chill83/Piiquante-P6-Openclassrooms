// Importation packages
const express = require('express');
const expressRateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv').config();

// Importation routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connection et authentification à MongoDB (base de données)
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// J'applique express
const app = express();

// Je configure express-rate-limit
const limiter = expressRateLimit({
  max: 100,
  windowsMs: 15 * 60 * 1000,
  message: "Too many request from this IP adress"
})
// J'applique express-rate-limit
app.use('/api', limiter);

// Utilisation Helmet
app.use(helmet());

// Configuration CORS
app.use(cors());

// Reconnaitre les requêtes en objets JSON
app.use(express.json());

// Gestionnaire de routage image
app.use('/images', express.static(path.join(__dirname, 'images')));

// Configuration routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// Exportation modules
module.exports = app;