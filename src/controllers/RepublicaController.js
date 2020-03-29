const Republica = require('../models/RepublicaModel');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
  const {
    nome,
    tipo,
    vaga,
    premium,
    genero,
    historia,
    comodos,
    contas,
    endereco,
    adicionais,
    telefones,
    fotos
  } = req.body;

  if((!nome || !tipo || !vaga || !premium || !genero || !comodos || !contas || !endereco || !adicionais || !telefones)){
    let message = "Alguns campos obrigatórios não foram informados!!";
    let required_fields = ['nome', "tipo", "vaga", "premium", "genero", "comodos", "contas", "endereco", "adicionais", "fotos"];
    let code = "400.002";
    return res.status(400).send({message, code, required_fields});
  }

  try{
    return res.status(201).send(
      await Republica.create({
        nome: nome,
        tipo: tipo,
        vaga: {
          tipo: vaga.tipo,
          livre: vaga.livre,
          total: vaga.total
        },
        premium: premium,
        genero: genero,
        historia: historia,
        comodos: comodos,
        contas: contas,
        endereco: {
          cep: endereco.cep,
          rua: endereco.rua,
          numero: endereco.numero,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          uf: endereco.uf
        },
        adicionais: adicionais,
        telefones: telefones,
        fotos: fotos
      })
    );
  }catch (err) {
    let message = "Ocorreu um erro no cadastro da república"
    let code = "400.000";
    return res.status(400).send({code, message});
  }
};

exports.update = async (req, res) => {
  const {
    id,
    nome,
    tipo,
    vaga,
    genero,
    historia,
    comodos,
    contas,
    endereco,
    adicionais,
    telefones,
    fotos
  } = req.body;

  try {
    return res.status(200).send(
      await Republica.updateOne({_id: id}, {$set: {
        nome: nome,
        tipo: tipo,
        vaga: {
          tipo: vaga.tipo,
          livre: vaga.livre,
          total: vaga.total
        },
        genero: genero,
        historia: historia,
        comodos: comodos,
        contas: contas,
        endereco: {
          cep: endereco.cep,
          rua: endereco.rua,
          numero: endereco.numero,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          uf: endereco.uf
        },
        adicionais: adicionais,
        telefones: telefones,
        fotos: fotos
      }})
    );
  } catch (err) {
    let message = "Ocorreu um erro na alteração da república";
    let code = "400.00";
    return res.status(400).send({code, message});
  }
};

exports.remove = async (req, res) => {
  const {
    id
  } = req.body;

  try {
    return res.status(200).send(
      await Republica.remove({_id: id}));
  } catch (err) {
    let message = "Ocorreu um erro na exclusão da república";
    let code = "400.00";
    return res.status(400).send({code, message});
  }
};

exports.detail = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const republica = await Republica.findById(id);

    if(!republica){
      let message = "Repúbica não encontrada";
      let code = "400.000";
      return res.status(400).send({code, message});
    }

    return res.status(200).send({republica});

  } catch (error) {
    let message = "Ocorreu um erro ao buscar detalhes da república";
    let code = "400.000";
    return res.status(400).send({code, message});
  }
}
