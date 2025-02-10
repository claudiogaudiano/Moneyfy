import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Transactions from './components/Transactions';
import PrivateRoute from './PrivateRoute';

const App = () => {

  // Carica i valori da localStorage
  const [totSpese, setTotSpese] = useState(() => {
    return Number(localStorage.getItem('totSpese')) || 0;
  });

  const [totGuadagni, setTotGuadagni] = useState(() => {
    return Number(localStorage.getItem('totGuadagni')) || 0;
  });

  // Salva i valori quando cambiano
  useEffect(() => {
    localStorage.setItem('totSpese', totSpese);
    localStorage.setItem('totGuadagni', totGuadagni);
  }, [totSpese, totGuadagni]);

  return (
    <Router>
      <Routes>

        {/* Rotte pubbliche */}
        <Route path="*" element={<Navigate to={"/login"} />} />
        <Route element={<PrivateRoute totSpese={totSpese} totGuadagni={totGuadagni} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Rotte private */}
        <Route element={<PrivateRoute totSpese={totSpese} totGuadagni={totGuadagni} />}>
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
    </Router>
  );
}

export default App;