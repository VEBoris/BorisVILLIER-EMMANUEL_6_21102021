const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce); // création d'une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // modification d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce); // suppression d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce); // récupération d'une sauce via son Id
router.get('/', auth, sauceCtrl.getAllSauces); // récupération de toutes les sauces
router.post('/:id/like', auth, sauceCtrl.likeDislike); // like dislike d'une sauce

module.exports = router;