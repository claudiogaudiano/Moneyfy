import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Box,
  Typography,
  Button
} from '@mui/material';
import * as jwt_decode from 'jwt-decode';
import { getCookie } from '../../cookieFunction';
import HomeChart from './HomeChart';

const Home = () => {
  const { totSpese, totGuadagni } = useOutletContext();

  const [user, setUser] = useState({});
  useEffect(() => {
    async function loadUserInfo() {
      const token = getCookie('User');
      const userInfo = jwt_decode.jwtDecode(token);
      setUser(userInfo);
    }
    loadUserInfo();
  }, []);

  const currentDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <Box sx={{ p: 2, position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        Benvenuto in Moneyfy, {user.name}!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Questa webapp ti permette di tenere traccia delle tue spese e dei tuoi guadagni mensili
        oltre a poterle gestire in modo semplice e veloce eliminandole e modificandole. <br />
        Inoltre potrai visualizzare le informazioni del tuo account e modificarle. <br />
        In questa pagina puoi visualizzare un confronto tra le tue spese e i tuoi guadagni di questo mese. <br />
        <hr />
      </Typography>
      <Box id='container'
        sx={{
          mb: 2,
          width: '500px',
          height: '550px',
        }}>
        <Typography variant="h6" gutterBottom>
          Confronto tra spese e guadagni di {currentDate}
        </Typography>
        <HomeChart totSpese={totSpese} totGuadagni={totGuadagni} />
      </Box>
      <Typography variant="h5" gutterBottom>
        Per maggior informazioni e per gestire le tue transazioni
        vai alla sezione
        <Button sx={{
          color: 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          textTransform: 'none',
        }} component={Link} to={'/transactions'}>Transazioni</Button>.
        <br />
        Per maggior informazioni sul tuo account e per modificare la password
        vai alla sezione
        <Button sx={{
          color: 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          textTransform: 'none',
        }} component={Link} to={'/profile'}>Profilo</Button>. 
      </Typography>
    </Box>
  );
};

export default Home;