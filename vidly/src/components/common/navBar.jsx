import React from "react";
import { Link, NavLink, Router } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light w-100">
            <NavLink className="navbar-brand" to="/">
                Home
            </NavLink>
            <NavLink className="navbar-brand" to="/">
                Movies
            </NavLink>
            <NavLink className="navbar-brand" to="/customers">
                Customers
            </NavLink>
            <NavLink className="navbar-brand" to="/rentals">
                Rentals
            </NavLink>
        </nav>
    );
};

export default NavBar;
