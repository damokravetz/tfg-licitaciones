const publicacion = require('../controllers/publicacionController.js');

module.exports = (router) => {
    router.post('/publicacion', publicacion.create);
  
  };