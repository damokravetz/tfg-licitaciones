const adjudicacion = require('../controllers/adjudicacionController.js');

module.exports = (router) => {
    router.post('/adjudicacion', adjudicacion.create);
    router.get('/adjudicacion', adjudicacion.search);
  
  };