// Importation module du modèle sauce
const Sauce = require('../models/sauce');
// Importation package Node fs
const fs = require('fs');



// ---------------------------------   Controllers sauce  -------------------------------------------- //
//  -------------------------------------------------------------------------------------------------- //


// --------------  Renvoyer toutes les sauces de la base de données  -----------------
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

// -----------------  Renvoyer la sauce avec l'_id fourni  --------------
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

// -------------------  Créer une sauce --------------------------
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    // Création de la nouvelle instance du schéma Sauce
    const sauce = new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: '',
        usersDisliked: ''
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
        .catch(error => res.status(400).json({error}));
};

// ---------------   Fonction pour modifier une sauce -------------------
exports.modifySauce = (req, res, next) => {
    // Cas où l'image est modifiée
    if (req.file) {
        // Je récupère la sauce grâce à son id
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                // Je supprime l'ancienne image du dossier ./images
                fs.unlink(`images/${filename}`, () => {
                    // Je met à jour le reste de la sauce avec les nouvelles informations
                    const sauceObject = req.file ?
                    {
                      ...JSON.parse(req.body.sauce),
                      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : { ...req.body };
                    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
                        .catch(error => req.status(400).json({error}));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } 
    // Cas où l'image n'est pas modifiée
    else {
        const sauceObject = {...req.body};
        Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
            .catch(error => req.status(400).json({error}));
    }
};

// --------------------- Fonction pour supprimer une sauce  ------------------------
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// --------------------  Fonction Like/dislike  --------------------------
exports.likeAndDislikeSauces = (req, res, next) => {

    // Si l'utilisateur like
    if (req.body.like === 1) {  
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })  
        // J'incrémente les likes et j'ajoute l'userId au tableau usersLiked
            .then((sauce) => res.status(200).json({ message: 'Like ajouté' }))
            .catch(error => res.status(400).json({ error }))
    } 


    // Si l'utilisateur dislike
    else if (req.body.like === -1) {  
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })  
            // J'incrémente les dislikes et j'ajoute l'userId au tableau usersDisliked
            .then((sauce) => res.status(200).json({ message: 'Dislike ajouté' }))
            .catch(error => res.status(400).json({ error }))
    } 


    // L'utilisateur retire son Like ou Dislike
    else {  
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {

            if (sauce.usersLiked.includes(req.body.userId)) {   // Si l'utilisateur retire son Like, passage du statut Like au statut Neutre

                //  Je retire l'userId du tableau usersLiked et j'incrémente de -1 les likes
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                    .then((sauce) => { res.status(200).json({ message: 'Like supprimé' }) })
                    .catch(error => res.status(400).json({ error }))
            } 

            else if (sauce.usersDisliked.includes(req.body.userId)) {  // Si l'utilisateur retire son Dislike, passage du statut Dislike au statut Neutre

                //  Je retire l'userId du tableau usersDisliked et j'incrémente de -1 les dislikes
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                    .then((sauce) => { res.status(200).json({ message: 'Dislike supprimé' }) })
                    .catch(error => res.status(400).json({ error }))
                }
        })
        .catch(error => res.status(400).json({ error }))
    }
};


//  ------------------------------------------------------------------------------------------------  //
//  -------------------------------    Fin controllers sauce   -------------------------------------  //