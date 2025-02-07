import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Homepage/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import FixedLayout from './components/FixedLayout/FixedLayout';
import { getCookie } from './cookieFunction';
import Transactions from './components/Transactions';

const App = () => {
  const token = getCookie('User');
 /*  const [isLogged, setIsLogged] = useState(!!token); */
  
  // Caricare i valori da localStorage
  const [totSpese, setTotSpese] = useState(() => {
    return Number(localStorage.getItem('totSpese')) || 0;
  });

  const [totGuadagni, setTotGuadagni] = useState(() => {
    return Number(localStorage.getItem('totGuadagni')) || 0;
  });

  // Salvare i valori quando cambiano
  useEffect(() => {
    localStorage.setItem('totSpese', totSpese);
    localStorage.setItem('totGuadagni', totGuadagni);
  }, [totSpese, totGuadagni]);

  return (
    <Router>
      {/* {isLogged ? (
          <Routes>
            <Route element={<FixedLayout totSpese={totSpese} totGuadagni={totGuadagni} />}>
              <Route path="/"
                element={<Home 
                  totSpese={totSpese}
                  totGuadagni={totGuadagni}
                />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/transactions"
                element={<Transactions
                  setTotSpese={setTotSpese}
                  setTotGuadagni={setTotGuadagni}
                  totSpese={totSpese}
                  totGuadagni={totGuadagni}
                />} />
            </Route>
          </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )} */}
      <Routes>
        <Route element={<FixedLayout totSpese={totSpese} totGuadagni={totGuadagni} />}>
          <Route path="/"
            element={<Home
              totSpese={totSpese}
              totGuadagni={totGuadagni}
            />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions"
            element={<Transactions
              setTotSpese={setTotSpese}
              setTotGuadagni={setTotGuadagni}
              totSpese={totSpese}
              totGuadagni={totGuadagni}
            />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
