import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Register from "./components/register";

function App() {
    return (
        <React.Fragment>
            <NavBar />
            <div className="m-4">
                <Switch>
                    <Route path="/movies/:id" component={MovieForm} />
                    <Route path="/movieForm" component={MovieForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/rentals" component={Rentals} />
                    <Route path="/register" component={Register} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect from="/" exact to="/movies" />
                    <Redirect to="/not-found" />
                </Switch>
            </div>
        </React.Fragment>
    );
}

export default App;
