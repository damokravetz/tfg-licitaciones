const suscripcion = require('../controllers/suscripcionController.js');

module.exports = (router) => {
    router.post('/suscripcion', suscripcion.create);
    router.get('/suscripcion', suscripcion.search);
  
  };