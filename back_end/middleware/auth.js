const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // les tokens sont une solution d'authentification forte pour une meilleur sécurité des données
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // les tokens permettent la connexion unique à un compte
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

// token permet la connexion unique à un compte (2 utilisateurs ne peuvent se connecter à un même compte)