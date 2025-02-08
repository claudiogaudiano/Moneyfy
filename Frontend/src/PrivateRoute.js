import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "./cookieFunction";

export default function PrivateRoute({ totSpese, totGuadagni }) {
    const token = getCookie("User");
    return token ?
        <Outlet context={{ totSpese, totGuadagni }} />
        : <Navigate to="/"></Navigate>;

}