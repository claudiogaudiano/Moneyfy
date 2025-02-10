const express = require('express');
const {createTransaction, getTransactionsByUser, deleteTransaction, updateTransaction} = require('../controllers/transactionController');
const transactionRoutes = express.Router();

// Aggiunge una transazione
transactionRoutes.post('/transactions/add', createTransaction);

// Ottiene tutte le transazioni dell'utente che ha fatto l'accesso
transactionRoutes.get('/transactions', getTransactionsByUser);

// Elimina una transazione
transactionRoutes.delete('/transactions/:transactionId', deleteTransaction);

// Aggiorna una transazione
transactionRoutes.put('/transactions/:transactionId', updateTransaction);

module.exports = transactionRoutes;