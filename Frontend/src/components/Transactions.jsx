import { useState, useEffect } from "react";
import { getCookie } from "../cookieFunction";
import * as jwt_decode from "jwt-decode";
import { createTransaction, getTransactionByUser, deleteTransaction, updateTransaction } from "./api";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Fab,
    FormControl,
    List,
    Card,
    CardContent,
    CardActions,
    AppBar,
    Toolbar
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./Sidebar";
import logo from "../moneyfy_icon.png";
import {Link} from 'react-router-dom';

const Transactions = ({ setTotSpese, setTotGuadagni }) => {
    const [transaction, setTransaction] = useState({
        amount: "",
        type: "",
        description: "",
    });
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState('');

    useEffect(() => {
        async function loadUserInfo() {
            const token = getCookie('User');
            const userInfo = jwt_decode.jwtDecode(token);
            setUser(userInfo);
        }
        loadUserInfo();
        async function fetchTransactions() {
            try {
                const token = getCookie('User');
                const user = jwt_decode.jwtDecode(token);
                const userId = user._id;
                const data = await getTransactionByUser(userId);
                setTransactions(data);
            } catch (err) {
                alert('Errore nel caricamento delle transazioni');
                console.error(err);
            }
        };
        fetchTransactions();
    }, []);
    const userId = user._id;

    useEffect(() => {
        const expenses = transactions.filter((transaction) => transaction.type === 'spesa').filter((transaction) => new Date(transaction.date).getMonth() === new Date().getMonth());
        const incomes = transactions.filter((transaction) => transaction.type === 'guadagno').filter((transaction) => new Date(transaction.date).getMonth() === new Date().getMonth());

        const totExp = expenses.reduce((acc, spesa) => acc + spesa.amount, 0);
        const totInc = incomes.reduce((acc, guadagno) => acc + guadagno.amount, 0);

        setTotSpese(totExp);
        setTotGuadagni(totInc);
    }, [transactions, setTotSpese, setTotGuadagni]);

    const [openModify, setOpenModify] = useState(false);
    const [transactionToModify, setTransactionToModify] = useState(null);

    // Stato per gestire i dati del form di modifica
    const [modifyData, setModifyData] = useState({
        description: "",
        amount: "",
    });

    // Gestione del tipo (spesa o guadagno)
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.id]: e.target.value });
    };

    const [open, setOpen] = useState(false);
    const [openD, setOpenD] = useState(false);

    // Gestione del dialog per aggiungere transazioni
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddTransaction = async () => {
        transaction.userId = userId;
        transaction.type = type;
        const response = await createTransaction(transaction)
        alert('Transazione creata con successo');
        console.log('Risposta ricevuta dal backend:', response.data);
        setOpen(false);
    };

    const currentDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    const spese = transactions.filter((transaction) => transaction.type === 'spesa').filter((transaction) => new Date(transaction.date).getMonth() === new Date().getMonth());
    const guadagni = transactions.filter((transaction) => transaction.type === 'guadagno').filter((transaction) => new Date(transaction.date).getMonth() === new Date().getMonth());

    const exp = spese.reduce((acc, spesa) => acc + spesa.amount, 0);
    const inc = guadagni.reduce((acc, guadagno) => acc + guadagno.amount, 0);

    //  Gestione del dialog per eliminare transazioni
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    // Apertura del dialog e impostazione dell'ID della transazione selezionata
    const handleOpenD = (transactionId) => {
        setSelectedTransactionId(transactionId);
        setOpenD(true);
    };

    // Chiusura del dialog
    const handleCloseD = () => {
        setSelectedTransactionId(null);
        setOpenD(false);
    };

    // Eliminazione della transazione
    const handleDelete = async () => {
        if (selectedTransactionId) {
            await deleteTransaction(userId, selectedTransactionId);
            setTransactions(transactions.filter(tx => tx._id !== selectedTransactionId)); // Aggiornamento
            handleCloseD();
        }
    };

    // Funzione per aprire il dialog di modifica e precompilare i campi
    const handleOpenModify = (transaction) => {
        setTransactionToModify(transaction);
        setModifyData({
            description: transaction.description,
            amount: transaction.amount,
            type: transaction.type
        });
        setOpenModify(true);
    };

    const handleCloseModify = () => {
        setTransactionToModify(null);
        setOpenModify(false);
    };

    const handleModifyChange = (e) => {
        setModifyData({ ...modifyData, [e.target.name]: e.target.value });
    };

    // Handler per inviare la modifica
    const handleModifySubmit = async () => {
        try {
            // Effettua la chiamata API con l'ID della transazione e i dati aggiornati
            const response = await updateTransaction(transactionToModify._id, {
                ...modifyData,
                userId: userId
            });
            alert(response.message || 'Transazione modificata con successo');
            // Aggiorna la lista delle transazioni nel frontend
            setTransactions(transactions.map(t => t._id === transactionToModify._id ? { ...t, ...modifyData } : t));
            handleCloseModify();
        } catch (error) {
            alert('Errore durante la modifica della transazione');
        }
    };

    return (
        <>
            <Sidebar />
            <AppBar id="appBar" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <img src={logo} alt="Moneyfy Logo" style={{ marginRight: '16px', marginLeft: '-8px', height: '35px' }} />
                    <Typography variant="h6" noWrap component="div">
                        Moneyfy
                    </Typography>
                </Toolbar>
            </AppBar>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                }}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>
            <Box id="mainContent"
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: `240px`,
                    mt: `64px`,
                }}>
                <Typography variant="h5" gutterBottom>
                    In questa sezione potrai visualizzare le tue spese e i tuoi
                    guadagni mensili oltre a poter aggiungere nuove transazioni
                    attraverso il bottone in basso a destra.
                </Typography>

                <Box id='container'
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', sm: 'column' },
                        justifyContent: 'space-between',
                        mb: 2,
                        width: '100%',
                        height: '100%',
                    }}>

                    <Box id='spese'
                        sx={{ flex: 1, bgcolor: '#ffd4d4', borderRadius: 2, p: 2, mb: { xs: 2, sm: 0 } }}>
                        <Typography variant="h6">Spese</Typography>
                        <Typography variant="body1">
                            Totale Spese del mese di <span style={{ fontWeight: 'bold' }}>{currentDate}</span>:  <span style={{ fontSize: 23, fontWeight: "bold", marginLeft: 5 }}>{exp}€</span>
                        </Typography>
                        <br></br>
                        <Typography variant="h4">{ }</Typography>
                        <List sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            {spese.map((spesa) => (
                                <Card key={spesa._id} sx={{ minWidth: 200, bgcolor: '#efefef' }} variant='outlined' >
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                                        <Typography variant="h5">{`${spesa.description}`}</Typography>
                                        <Typography variant="h6">{`${spesa.amount} €`}</Typography>
                                        <Typography variant="h6">
                                            {`${new Date(spesa.date).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Button size="small" onClick={() => handleOpenModify(spesa)}>Modifica</Button>
                                        <Button
                                            sx={{ color: 'red' }}
                                            size="small"
                                            onClick={() => handleOpenD(spesa._id)}>
                                            Elimina
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </List>
                    </Box>
                    <br></br>

                    <Box id='guadagni'
                        sx={{ flex: 1, bgcolor: '#c4ffc4', borderRadius: 2, p: 2 }}>
                        <Typography variant="h6">Guadagni</Typography>
                        <Typography variant="body1">
                            Totale Guadagni del mese di <span style={{ fontWeight: 'bold' }}>{currentDate}</span>: <span style={{ fontSize: 23, fontWeight: "bold", marginLeft: 5 }}>{inc}€</span>
                        </Typography>
                        <br></br>
                        <Typography variant="h4"></Typography>
                        <List sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            {guadagni.map((guadagno) => (
                                <Card key={guadagno._id} sx={{ minWidth: 200, bgcolor: '#efefef' }} variant='outlined' >
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                                        <Typography variant="h5">{`${guadagno.description}`}</Typography>
                                        <Typography variant="h6">{`${guadagno.amount} €`}</Typography>
                                        <Typography variant="h6">{`${new Date(guadagno.date).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })}`}</Typography>
                                    </CardContent>
                                    <CardActions sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Button size="small" onClick={() => handleOpenModify(guadagno)}>Modifica</Button>
                                        <Button
                                            sx={{ color: 'red' }}
                                            size="small"
                                            onClick={() => handleOpenD(guadagno._id)} >
                                            Elimina
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </List>
                    </Box>

                    <br />
                    <Typography variant="h5" gutterBottom>
                        Per tornare alla pagina principale vai a
                        <Button sx={{
                            color: 'inherit',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            textTransform: 'none',
                        }} component={Link} to={'/'}>Home</Button>.
                    </Typography>

                </Box>

                {/* Dialog per aggiungere transazioni */}
                <Box sx={{ p: 2, position: 'relative' }}>
                    <Dialog open={open} onClose={handleClose}>
                        <form onSubmit={handleAddTransaction}>
                            <DialogTitle>Aggiungi Transazione</DialogTitle>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    name="description"
                                    label="Descrizione"
                                    type="text"
                                    id='description'
                                    fullWidth
                                    value={transaction.description}
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                    margin="dense"
                                    name="amount"
                                    label="Importo (€)"
                                    type="number"
                                    id='amount'
                                    fullWidth
                                    value={transaction.amount}
                                    onChange={(e) => handleChange(e)}
                                />
                                <Typography variant="subtitle1" gutterBottom marginTop={2}>
                                    Tipo di Transazione
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        name="type"
                                        id='type'
                                        value={type}
                                        onChange={handleTypeChange}
                                    >
                                        <FormControlLabel value="spesa" control={<Radio />} label="Spesa" />
                                        <FormControlLabel value="guadagno" control={<Radio />} label="Guadagno" />
                                    </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Annulla</Button>
                                <Button type="submit" variant='contained'>Aggiungi</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </Box>

                {/* Dialog per eliminare transazioni */}
                <Box sx={{ p: 2, position: 'relative' }}>
                    <Dialog open={openD} onClose={handleCloseD}>
                        <DialogTitle>Conferma eliminazione</DialogTitle>
                        <DialogContent>
                            Sei sicuro di voler eliminare questa transazione?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseD} color="primary">Annulla</Button>
                            <Button onClick={handleDelete} color="error" variant="contained">
                                Elimina
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>

                {/* Dialog di modifica transazione */}
                <Dialog open={openModify} onClose={handleCloseModify}>
                    <DialogTitle>Modifica Transazione</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField sx={{ mt: 2 }}
                            label="Descrizione"
                            name="description"
                            value={modifyData.description}
                            onChange={handleModifyChange}
                            fullWidth
                        />
                        <TextField
                            label="Importo (€)"
                            name="amount"
                            type="number"
                            value={modifyData.amount}
                            onChange={handleModifyChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModify} color="primary">Annulla</Button>
                        <Button onClick={handleModifySubmit} color="success">Salva</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default Transactions;