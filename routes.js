const express = require("express");
const router = express.Router();
const Controller = require("./src/controllers/Controller.js")

// private routes
router.get("/", Controller.getUsers);


// Rotas
router.get("/", Controller.renderHome);
router.get("/login", Controller.getlogin);
router.get("/register", Controller.getregister);
router.post("/register", Controller.register);
router.post("/login", Controller.login);

module.exports = router;
