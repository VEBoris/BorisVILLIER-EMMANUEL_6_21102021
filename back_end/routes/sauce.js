const express = require('express');

const router = express.Router();

// Importer le middleware auth pour protèger les routes des middleware
const auth = require('../middleware/auth');

// Importer le middleware multer-config pour enregistrer des fichiers images
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

// Dans le fichier du dossier routes, on va remplacer app.* par router.* et remplacer /api/sauces par /
//Routes pour CRUD complet (creation, lecture, modification, suppression des ressources de l'application)

// 1. Route pour créer une sauce
// 2. Route pour modifier une sauce
// 3. Route pour supprimer une sauce
// 4. Route pour recuperer une sauce avec son id
// 5. Route pour recuperer toutes les sauces

// 6. Route pour les likes et dislikes
// Pour userID fourni:
// Si j'aime = 1,l'utilisateur aime la sauce.
// Si j'aime = 0,l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas.
// Si j'aime =-1,l'utilisateur n'aime pas la sauce.
// L'identifiant de l'utilisateur doit être ajouté ou supprimé du tableau approprié, en gardant une trace de ses préférences
// et en l'empêchant d'aimer ou de ne pas aimer la même sauce plusieurs fois.
// Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour avec chaque "j'aime".

router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likeDislike);

module.exports = router;