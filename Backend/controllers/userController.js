const User = require('../models/User');
const Transaction = require('../models/Transaction');
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: '../.env' });
const passport = require('passport');

const createUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    dateOfSub: new Date(),
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (user) {
      res.status(201).json({ message: "Utente registrato" });
    } else {
      res.status(400).json({ message: "Errore nella registrazione" });
    }
  });
};

const jwt_secret = process.env.JWT_SECRET
const authenticate = async (req, res) => {
  passport.authenticate("local", {
    failureFlash: "Mail o password errata",
    successFlash: "Login riuscito",
  }, (err, user, info) => {
    if (user) {
      const dbUser = {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        dateOfSub: user.dateOfSub,
        transactions: user.transactions,
        hash: user.hash,
        salt: user.salt,
      }
      const token = jwt.sign(dbUser, jwt_secret);
      return res.status(200).json({ message: "Login riuscito", info: info, token: token });
    }
    else if (info) {
      return res.status(401).json({ message: "Mail o password errata", info: info });
    }
  })(req, res);
}

const updateUser = async (req, res) => {
  User.findOne({ _id: req.body._id })
    .then(e => {
      const modUser = new User({
        _id: e._id,
        name: e.name,
        surname: e.surname,
        email: e.email,
        dateOfSub: e.dateOfSub,
        transactions: e.transactions,
      });
      User.findOneAndDelete({ _id: req.body._id })
        .then(() => {
          User.register(modUser, req.body.password, (err, user) => {
            if (user)
              return res.status(200).json("User updated");
            else if (err) {
              return res.status(409).json(err);
            }
          })
        })
    })
}

const deleteProfile = async (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      user.transactions.forEach(async (transaction) => {
        await Transaction.findOneAndDelete({ _id: transaction })
      })
    })
   User.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      return res.status(200).json("Profilo eliminato");
    })
}

module.exports = { createUser, authenticate, updateUser, deleteProfile };