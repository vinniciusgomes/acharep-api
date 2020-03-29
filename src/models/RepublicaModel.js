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
    cep: {
      type: String,
      required: true
    },
    rua: {
      type: String,
      required: true
    },
    numero: {
      type: String,
      required: true
    },
    bairro: {
      type: String,
      required: true
    },
    cidade: {
      type: String,
      required: true
    },
    uf: {
      type: String,
      required: true
    }
  },
  adicionais: [String],
  telefones: [String],
  fotos: [String],
  usuario_id: {
    type: mongoose.Types.ObjectId,
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

const Republica = mongoose.model("Republica", RepublicaSchema);

module.exports = Republica;
