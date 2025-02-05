const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoutes = require('./routers/userRoutes');
const transactionRoutes = require('./routers/transactionRoutes');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;

// Permette di gestire richieste da domini diversi 
// (necessario per la comunicazione con il frontend)
app.use(cors({
    origin: 'https://moneyfyfrontend.onrender.com/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use(userRoutes);
app.use(transactionRoutes);

//Connessione al database di MongoDB
const port = process.env.PORT;
const uri = process.env.DB_URI;
mongoose.connect(uri)
    .then(() => {
        console.log("Connesso al DB");
        app.listen(port, () => {
            console.log(`App in ascolto sulla porta ${port}`);
        });
    })
    .catch((error) => {
        console.log("Errore di connessione al DB", error);
    })
