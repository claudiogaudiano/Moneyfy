const express = require("express");
const {createUser, authenticate, updateUser, deleteProfile} = require("../controllers/userController.js");
const userRoutes = express.Router();

// Crea il nuovo utente
userRoutes.post("/signup", createUser);

// Fa login dell'utente
userRoutes.post("/login", authenticate);

// Aggiorna la password dell'utente
userRoutes.put("/profile", updateUser);

// Elimina l'utente
userRoutes.delete("/profile/:id", deleteProfile);

module.exports = userRoutes;