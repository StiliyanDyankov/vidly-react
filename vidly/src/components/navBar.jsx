import React from "react";
import {NavLink, Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Vidly
            </Link>

            <div className="navbar" id="navbarSupportedContent">
                <ul className="navbar-nav flex-row justify-content-start">
                    <li className="nav-item p-2">
                        <NavLink className="nav-link" to="/movies">
                            Movies
                        </NavLink>
                    </li>
                    <li className="nav-item p-2">
                        <NavLink className="nav-link" to="/customers">
                            Customers
                        </NavLink>
                    </li>
                    <li className="nav-item p-2">
                        <NavLink className="nav-link" to="/rentals">
                            Rentals
                        </NavLink>
                    </li>
                    <li className="nav-item p-2">
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item p-2">
                        <NavLink className="nav-link" to="/register">
                            Register
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
