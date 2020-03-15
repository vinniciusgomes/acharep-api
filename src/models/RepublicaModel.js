const mongoose = require('mongoose');

const RepublicaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  vaga: {
    tipo: {
      type: String,
      required: true
    },
    livre: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  premium: {
    type: Boolean,
    default: false
  },
  genero: {
    type: String,
    required: true
  },
  historia: String,
  comodos: [String],
  contas: [String],
  endereco: {
    type: String,
    required: true
  },
  adicionais: [String],
  telefones: [String],
  fotos: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Republica = mongoose.model("Republica", RepublicaSchema);

module.exports = Republica;
