import axios from "axios";

const url = "https://moneyfybackend.onrender.com";

// api per la creazione dell'utente
export async function createUser(user) {
  return await axios.post(`${url}/signup`, user, {
    headers: { 'Content-Type': 'application/json' },
  });
}

// api per l'autenticazione dell'utente
export async function authenticate(user) {
  return await axios.post(`${url}/login`, user);
}

// api per l'aggiornamento dell'utente
export async function updateUser(user){
  return await axios.put(`${url}/profile`, user);
}
// api per l'eliminazione dell'account
export async function deleteProfile(user) {
  return await axios.delete(`${url}/profile/${user._id}`, user);
}

// api per la creazione di una transazione
export async function createTransaction(transaction) {
  return await axios.post(`${url}/transactions/add`, transaction, {
    headers: { 'Content-Type': 'application/json' },
  });
}

// api per reperire tutte le transazioni di un utente
export async function getTransactionByUser(userId) {
  const response = await axios.get(`${url}/transactions`, {
    params: { userId: userId },
  }, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

// api per eliminare una transazione
export async function deleteTransaction(userId, transactionId) {
  return await axios.delete(`${url}/transactions/${transactionId}`, {
    headers: { 'Content-Type': 'application/json' },
    params: { userId: userId },
  });
}

// api per aggiornare una transazione
export async function updateTransaction(transactionId, updatedData) {
  const response = await axios.put(`${url}/transactions/${transactionId}`, updatedData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
