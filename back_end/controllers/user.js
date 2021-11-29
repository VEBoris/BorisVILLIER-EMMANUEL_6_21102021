// bcrypt est une fonction qui permet le hashage (ou même cryptage)
const bcrypt = require('bcrypt');

// jsonwebtoken permet l'échange sécurisé de tokens entre plusieurs parties
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// On va d'abord hasher le mot de passe avec bcrypt (fonction asynchrone prends du temps), puis enregistrer l'utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // on met 10 tours pour securiser le mot de passe (plus de tours = plus de temps)
      .then(hash => { // hash permet de rendre plus rapide l'identification des données, permet également d'enregistrer le mot de passe sous forme de chaîne chiffrée
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


// On a utilisé la chaine de caractère TOKEN mais pas securisé
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',  //on securise le token avec le userId
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };