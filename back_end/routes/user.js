const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // incription de l'utilisateur
router.post('/login', userCtrl.login); // connexion de l'utilisateur

module.exports = router;