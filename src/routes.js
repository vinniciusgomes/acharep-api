const { Router } = require('express');

const route = Router();

const UsuarioController = require('./controllers/UsuarioController');
const RepublicaController = require('./controllers/RepublicaController');

route.get('/', (req, res) => {

});

route.post('/rep', RepublicaController.create);
route.put('/rep', RepublicaController.update);
route.delete('/rep', RepublicaController.remove);
route.get('/rep/:id', RepublicaController.detail);

route.post('/user', UsuarioController.signUp);
route.get('/user', UsuarioController.signIn);

module.exports = route;
