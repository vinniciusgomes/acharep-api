const Usuario = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.signUp = async (req, res) => {
  const {
    email,
    senha
  } = req.body;

  if(!email, !senha){
    let message = "Alguns campos obrigatórios não foram informados";
    let required_fields = ["email", "senha"];
    let code = "400.002";
    return res.status(400).send({code, message, required_fields});
  }

  await Usuario.findOne({email: email}, async (err, result) => {
    if(result){
      let message = "Este email já se encontra cadastrado";
      let code = "400.009";
      res.status(409).send({code, message});
    }
    const crypted = bcrypt.hashSync(senha, 10);

    const { _id } = await Usuario.create({
      email: email,
      senha: crypted
    });

    const token = jwt.sign({id: _id}, config.key, { expiresIn: '30m' });

    return res.status(201).send({token: token});
  });
}

exports.signIn = async (req, res) => {
  const {
    email,
    senha
  } = req.body;

  const usuario = await Usuario.findOne({email: email});

  if(!usuario){
    let message = "Email não cadastrado";
    let code = "400.000";
    return res.status(400).send({code, message});
  }

  if(!bcrypt.compareSync(senha, usuario.senha)){
    let message = "Senha incorreta";
    let code = "400.000";
    return res.status(400).send({code, message});
  }

  const token = jwt.sign({id: usuario._id}, config.key, { expiresIn: '30m'});

  res.status(200).send({token: token});
}
