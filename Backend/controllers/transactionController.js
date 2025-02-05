const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Crea una nuova transazione
const createTransaction = async (req, res) => {
    try {
        // Crea una nuova transazione
        const newTransaction = new Transaction({
            type: req.body.type,
            amount: req.body.amount,
            date: new Date(),
            description: req.body.description,
            userId: req.body.userId,
        });
        const savedTransaction = await newTransaction.save();
        const userId = req.body.userId;
        // Aggiungta della transazione all'array dell'utente
        await User.updateOne(
            { _id: userId },
            { $push: { transactions: savedTransaction } }
        );
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add transaction' });
        console.log(error);
    }
};

// Ottiene tutte le transazioni per un utente specifico
const getTransactionsByUser = async (req, res) => {
    const userId = req.query.userId;
    const transactions = await Transaction.find({ userId: userId })
    res.status(200).json(transactions);
};

//Elimina una transazione
const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.transactionId;  // Dall'URL
        const userId = req.query.userId;  // Dai parametri di query

        if (!transactionId || !userId) {
            return res.status(400).json({ message: "ID utente o transazione mancante" });
        }
        await Transaction.findOneAndDelete({ _id: transactionId });
        // Rimuovi la transazione dall'array referenziato dell'utente
        await User.updateOne({ _id: userId }, { $pull: { transactions: transactionId } });
        res.status(200).json({ message: "Transazione eliminata con successo" });
    } catch (error) {
        console.error("Errore nella cancellazione:", error);
        res.status(500).json({ message: "Errore del server" });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params; // dall'URL
        const updatedData = req.body;          // dati aggiornati dal body

        // Esegui l'aggiornamento; new: true restituisce il documento aggiornato
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transactionId,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transazione non trovata" });
        }

        return res.status(200).json({
            message: "Transazione aggiornata con successo",
            transaction: updatedTransaction,
        });
    } catch (error) {
        console.error("Errore nell'aggiornamento della transazione:", error);
        return res.status(500).json({ message: "Errore interno del server" });
    }
};

module.exports = { createTransaction, getTransactionsByUser, deleteTransaction, updateTransaction };