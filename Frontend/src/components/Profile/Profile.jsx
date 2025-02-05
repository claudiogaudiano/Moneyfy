import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Box, Button, FormControl } from '@mui/material';
import * as jwt_decode from 'jwt-decode';
import { getCookie, deleteCookie, setCookie } from '../../cookieFunction';
import { authenticate, updateUser, deleteProfile } from '../api';

const Profile = () => {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });

    const [editInfo, setEditInfo] = useState();
    const [deleteInfo, setDeleteInfo] = useState({});

    function handleEditChange(e) {
        setEditInfo({ ...editInfo, [e.target.id]: e.target.value });
    }

    function handleDeleteChange(e) {
        setDeleteInfo(e.target.value);
    }

    useEffect(() => {
        async function loadUserInfo() {
            const token = getCookie('User');
            const userInfo = jwt_decode.jwtDecode(token);
            setUser(userInfo);
        }
        loadUserInfo();
    }, []);

    if (!user) {
        return <div>Caricamento profilo...</div>;
    }

    let date = new Date(user.dateOfSub);
    let stringDate = date.toString();

    async function handleEditProfile(e) {
        e.preventDefault();
        try {
            let userToDel = { username: user.email, password: editInfo.oldPassword };
            const res = await authenticate(userToDel);
            console.log(res);
            if (res.data.token) {
                setCookie('User', res.data.token, 1);
            }
            if (res.data.message === "Login riuscito") {
                if (editInfo.oldPassword !== editInfo.newPassword) {
                    let userToEdit = { _id: user._id, password: editInfo.newPassword };
                    const response = await updateUser(userToEdit);
                    if (response.data === "User updated") {
                        alert("Password modificata con successo");
                    }
                }
                else {
                    alert("La nuova password non può essere uguale alla precedente");
                }
            }
        }
        catch (error) {
            if (error.res.data === "Mail o password errata") {
                alert("Password Vecchia Errata");
            }
            else
                alert("Errore nella connessione con il server");
        }
    }

    async function handleDeleteProfile(e) {
        e.preventDefault();
        try {
            let userToDel = { username: user.email, password: deleteInfo };
            const res = await authenticate(userToDel);
            if (res.data.message === "Login riuscito") {
                let userToDel = { _id: user._id, password: deleteInfo };
                const response = await deleteProfile(userToDel);
                if (response.data === "Profilo eliminato") {
                    deleteCookie("User");
                    alert("Account eliminato con successo");
                    window.location.reload();
                    localStorage.clear();
                }
            }
        }
        catch (error) {
            if (error.response.data.message === "Mail o password errata") {
                alert("Password Errata");
            }
            else
                alert("Errore nella connessione con il server");
        }
    }

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Il tuo profilo
            </Typography>
            <br></br>
            <Typography variant="h6">
                Nome:
            </Typography>
            <Typography variant="h5">
                {user.name}
            </Typography>
            <br></br>
            <Typography variant="h6">
                Cognome:
            </Typography>
            <Typography variant="h5">
                {user.surname}
            </Typography>
            <br></br>
            <Typography variant="h6">
                E-mail:
            </Typography>
            <Typography variant="h5">
                {user.email}
            </Typography>
            <br></br>
            <Typography variant="h6">
                Data di creazione dell'account:
            </Typography>
            <Typography variant="h5">
                {stringDate.slice(8, 10) + stringDate.slice(3, 7) + stringDate.slice(10, 15)}
            </Typography>
            <Box
                sx={{
                    mt: 8,
                    p: 4,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    Cambia Password
                </Typography>
                <Box>
                    <form onSubmit={handleEditProfile}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                label="Vecchia Password"
                                id='oldPassword'
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                margin="normal"
                                onChange={(e) => handleEditChange(e)}
                            />
                        </FormControl>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                label="Nuova Password"
                                id='newPassword'
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                margin="normal"
                                onChange={(e) => handleEditChange(e)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Cambia Password
                        </Button>
                    </form>
                </Box>
            </Box>
            <br />
            <Box 
            sx={{
                mt: 8,
                p: 4,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 2,
            }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Elimina Account
                </Typography>
                <Box>
                    <form onSubmit={handleDeleteProfile}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                label="Password"
                                type='password'
                                onChange={(e) => handleDeleteChange(e)}
                                required
                                id="password"
                                margin="normal"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Elimina
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;