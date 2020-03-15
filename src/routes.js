const { Router } = require('express');

const route = Router();

const RepublicaController = require('./controllers/RepublicaController');

route.get('/', (req, res) => {
  res.send('Hello');
});

route.post('/rep', RepublicaController.create);
route.put('/rep', RepublicaController.update);
route.delete('/rep', RepublicaController.remove);

module.exports = route;
