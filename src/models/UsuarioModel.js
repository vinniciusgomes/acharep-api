const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Usuario = mongoose.model('Usuarios', UsuariosSchema);

module.exports = Usuario;
