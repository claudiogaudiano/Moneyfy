import React from 'react';
import { Outlet } from "react-router-dom";
import { getCookie } from "./cookieFunction";
import Login from './components/Login';

export default function PrivateRoute({ totSpese, totGuadagni }) {
    const token = getCookie("User");
    return token ?
        <Outlet context={{ totSpese, totGuadagni }} />
        : <Login />;
}
