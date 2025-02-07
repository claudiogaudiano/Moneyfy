import * as React from "react";
import { authenticate } from '../api';
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Box, Card, CardContent, Typography } from '@mui/material';
import { setCookie } from "../../cookieFunction";

const Login = ({ setIsLogged }) => {
    const [user, setUser] = React.useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    function handleChange(e) {
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authenticate(user);
            if (res.data.token) {
                setCookie('User', res.data.token, 1);
                setIsLogged(true);
                alert('Login effettuato!');
                navigate('/');            
            }
            console.log(res);
        } catch (error) {
            alert('Credenziali errate');
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)',
                color: '#fff',
            }}
        >
            <Card sx={{
                maxWidth: 400,
                width: '90%',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Benvenuto in Moneyfy
                    </Typography>
                    <Typography sx={{ mb: 2 }} variant="body2" align="center" gutterBottom>
                        Accedi al tuo account
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField sx={{ mb: 2 }}
                            fullWidth
                            label="E-mail"
                            variant="outlined"
                            id="username"
                            value={user.username}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            value={user.password}
                            variant="outlined"
                            onChange={(e) => handleChange(e)}
                        />
                        <Button sx={{ display: "block", margin: "15px auto" }} variant="contained" color="primary" type="submit">
                            Accedi
                        </Button>
                        <Typography align="center" variant="body2" >
                            Non hai un account?
                            <br />
                            <Button
                                sx={{
                                    color: 'inherit',
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    textTransform: 'none',
                                }}
                                component={Link} to="/signup"> Registrati</Button>
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
