const Republica = require('../models/RepublicaModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.create = async (req, res) => {
  const {
    nome,
    tipo,
    preco,
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

  if((!nome || !tipo || !preco || !vaga || !premium || !genero || !comodos || !contas || !endereco || !adicionais || !telefones)){
    let message = "Alguns campos obrigatórios não foram informados!!";
    let required_fields = ['nome', "tipo", "preco", "vaga", "premium", "genero", "comodos", "contas", "endereco", "adicionais", "fotos"];
    let code = "400.000";
    return res.status(400).send({message, code, required_fields});
  }

  let id = jwt.verify(req.header('Authorization').split(' ')[1], config.key, (err, decoded) => {
    return decoded.id;
  });

  try{
    return res.status(201).send(
      await Republica.create({
        nome: nome,
        tipo: tipo,
        preco: preco,
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
        fotos: fotos,
        usuario_id: id
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
    preco,
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
        preco: preco,
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
    const deleted = await Republica.remove({_id: id});

    if(!deleted.deletedCount){
      let message = "Ocorreu um erro na exclusão da república";
      let code = "500.000";
      return res.status(500).send({code, message});
    }

    return res.status(200).send({ok: true});
  } catch (err) {
    let message = "Ocorreu um erro na exclusão da república";
    let code = "500.000";
    return res.status(500).send({code, message});
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

    return res.status(200).send(republica);

  } catch (error) {
    let message = "Ocorreu um erro ao buscar detalhes da república";
    let code = "400.000";
    return res.status(400).send({code, message});
  }
}

exports.list = async (req, res) => {
  const fields = {};

  if(req.query.limite){
    limite = parseInt(req.query.limite);
  }else{
    limite = 500;
  }

  if(req.query.genero){
    fields.genero = req.query.genero;
  }

  if(req.query.cidade){
    fields["endereco.cidade"] = req.query.cidade;
  }

  if(req.query.preco){
    fields.preco = { $lte: req.query.preco};
  }

  if(req.query.tipo){
    fields["vaga.tipo"] = req.query.tipo;
  }

  const republica = await Republica.find(fields).sort({createdAt: -1}).limit(limite);

  return res.send(republica);
}
