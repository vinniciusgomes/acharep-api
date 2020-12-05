const { Router } = require("express");

const route = Router();

const UsuarioController = require("./controllers/UsuarioController");
const RepublicaController = require("./controllers/RepublicaController");

route.get("/", (req, res) => {});

route.get("/rep/:id", RepublicaController.detail);
route.get("/rep/", RepublicaController.list);

route.post("/user", UsuarioController.signUp);
route.post("/signin", UsuarioController.signIn);

route.use("/rep", UsuarioController.auth);

route.post("/rep", RepublicaController.create);
route.put("/rep", RepublicaController.update);
route.delete("/rep", RepublicaController.remove);

module.exports = route;
