const express = require('express');
const {createTransaction, getTransactionsByUser, deleteTransaction, updateTransaction} = require('../controllers/transactionController');
const transactionRoutes = express.Router();

// Aggiungi una transazione
transactionRoutes.post('/transactions/add', createTransaction);

// Ottieni tutte le transazioni dell'utente
transactionRoutes.get('/transactions', getTransactionsByUser);

// Elimina una transazione
transactionRoutes.delete('/transactions/:transactionId', deleteTransaction);

// Aggiorna una transazione
transactionRoutes.put('/transactions/:transactionId', updateTransaction);

module.exports = transactionRoutes;