const multer = require('multer');

const MIME_TYPES = { // mimes_types indique à multer les formats images acceptés
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // destination va indiquer à multer où enregister les images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  } // filename va indiquer à multer d'utiliser le nom d'origine et de remplacer les espaces par des underscores
});

module.exports = multer({storage: storage}).single('image');

// multer est un package qui permet de gérer les fichiers entrants dans les requêtes HTTP
// multer permet également aux utilisateurs de télécharger les images dans le site