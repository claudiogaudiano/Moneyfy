const express = require("express");
const {createUser, authenticate, updateUser, deleteProfile} = require("../controllers/userController.js");
const userRoutes = express.Router();

// Creazione del nuovo utente
userRoutes.post("/signup", createUser);

// Login dell'utente
userRoutes.post("/login", authenticate);

// aggiornamento della password utente
userRoutes.put("/profile", updateUser);

// Elimina utente
userRoutes.delete("/profile/:id", deleteProfile);

module.exports = userRoutes;