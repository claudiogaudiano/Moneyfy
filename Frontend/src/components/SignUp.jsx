import React, { useState } from "react";
import { createUser } from "./api";
import { Button, TextField, Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function handleChange(e) {
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Dati inviati dal frontend:', user);
        try {
            const response = await createUser(user)
            alert(response.message || 'Utente creato con successo');
            console.log('Risposta ricevuta dal backend:', response.data);
            navigate('/');
        } catch (error) {
            if (error.response) {
                console.error('Errore nel server:', error.response.data);
            } else {
                console.error('Errore di rete:', error.message);
                alert('Errore di connessione al server.');
            }
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)',
                color: '#fff',
            }}>
            <Card
                sx={{
                    maxWidth: 400,
                    width: '90%',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }}>
                <CardContent>
                    <Typography sx={{ mb: 2 }} variant="h5" align="center" gutterBottom>
                        Registrati a Moneyfy
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField sx={{ mb: 2 }}
                            fullWidth
                            type="text"
                            value={user.name}
                            id="name"
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            label="Nome"
                        />
                        <TextField sx={{ mb: 2 }}
                            fullWidth
                            type="text"
                            value={user.surname}
                            id="surname"
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            label="Cognome"
                        />
                        <TextField sx={{ mb: 2 }}
                            fullWidth
                            type="email"
                            value={user.email}
                            id='email'
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            label="Email"
                        />
                        <TextField
                            fullWidth
                            type="password"
                            value={user.password}
                            id="password"
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            label="Password"
                        />
                        <Button sx={{ display: "block", margin: "15px auto" }} type="submit" variant="contained" color="primary">
                            Conferma
                        </Button>
                        <Typography align="center" variant="body2" >
                            Hai già un account?
                            <br />
                            <Button
                                sx={{
                                    color: 'inherit',
                                    fontFamily: 'inherit',     
                                    fontSize: 'inherit',       
                                    textTransform: 'none',
                                }}
                                component={Link} to="/login">Accedi</Button>
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </Box >
    )
}

export default SignUp;