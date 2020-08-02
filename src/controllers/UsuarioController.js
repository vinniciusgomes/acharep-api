const Usuario = require("../models/UsuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.signUp = async (req, res) => {
  const { email, senha } = req.body;

  if ((!email, !senha)) {
    let message = "Alguns campos obrigatórios não foram informados";
    let required_fields = ["email", "senha"];
    let code = "400.002";
    return res.status(400).send({ code, message, required_fields });
  }

  await Usuario.findOne({ email: email }, async (err, result) => {
    if (result) {
      let message = "Este email já se encontra cadastrado";
      let code = "400.009";
      res.status(409).send({ code, message });
    }
    const crypted = bcrypt.hashSync(senha, 10);

    const { _id } = await Usuario.create({
      email: email,
      senha: crypted,
    });

    const token = jwt.sign({ id: _id }, process.env.APP_KEY, {
      expiresIn: "30m",
    });

    return res.status(201).send({ token: token });
  });
};

exports.signIn = async (req, res) => {
  const { email, senha } = req.query;

  const usuario = await Usuario.findOne({ email: email });

  if (!usuario) {
    let message = "Email não cadastrado";
    let code = "400.000";
    return res.status(400).send({ code, message });
  }

  if (!bcrypt.compareSync(senha, usuario.senha)) {
    let message = "Senha incorreta";
    let code = "400.000";
    return res.status(400).send({ code, message });
  }

  const token = jwt.sign({ id: usuario._id }, process.env.APP_KEY, {
    expiresIn: "30m",
  });

  res.status(200).send({ token: token });
};

exports.auth = async (req, res, next) => {
  if (!req.header("Authorization")) {
    let message = "Token de autenticação não fornecido";
    let code = "400.000";
    return res.status(400).send({ code, message });
  }

  const token = req.header("Authorization").split(" ")[1];

  jwt.verify(token, process.env.APP_KEY, async (err, decoded) => {
    if (err) {
      switch (err.name) {
        case "JsonWebTokenError":
          message = "Token de autorização inválido";
          code = "400.000";
          return res.status(400).send({ code, message });
          break;
        case "TokenExpiredError":
          message =
            "O token informado expirou, reenvie suas credenciais de login";
          code = "400.000";
          login = true;
          return res.status(400).send({ code, message, login });
          break;
      }
    }

    try {
      const usuario = await Usuario.findById(decoded.id);

      if (!usuario) {
        let message = "Você não está autorizado a realizar esta operação";
        let code = "400.000";
        return res.status(400).send({ code, message });
      }

      next();
    } catch (error) {
      let message = "Você não está autorizado a realizar esta operação";
      let code = "401.000";
      return res.status(401).send({ code, message });
    }
  });
};
