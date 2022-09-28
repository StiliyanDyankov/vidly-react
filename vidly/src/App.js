import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Movie from "./components/movie";

function App() {
    return (
        <main className="container p-0">
            <NavBar />
            <div className="content p-3">
                <Switch>
                    <Route
                        path="/movies/:id?"
                        render={(props) =>( <Movie {...props} />)}
                    />
                    <Route path="/rentals" component={Rentals} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/" exact component={Movies} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </main>
    );
}

export default App;
