import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Paginator from "./common/paginator";

class Movies extends Component {
    state = {
        movies: getMovies(),
        currentPage: 1,
        navPagesDisp: [1, 2, 3],
    };

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(
            (movieArg) => movieArg !== movie
        );
        this.setState({ movies });
    };

    handleLike = (movie) => {
        let movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].isLiked = !movies[index].isLiked;
        this.setState({ movies });
    };

    handlePageSel = (selPage) => {
        let internState = { ...this.state };
        internState.currentPage = selPage;
        this.setState({currentPage: selPage});
        // console.log("internal state");
        // console.log(internState);
        // console.log("real state");
        // console.log(this.state);
    };

    moviesDisplay () {
        let arr = [];
        for(let i = 0; i<3; i++) {
            arr.push(this.state.movies[i + (this.state.currentPage-1)*3])
        }
        return arr;
    }

    render() {
        const { length: count } = this.state.movies;

        if (count === 0) return <p>There are no movies in the DB.</p>;
        return (
            <div>
                <p>Showing {count} movies.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.moviesDisplay().map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(movie)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="invisible"
                                        onClick={() => this.handleLike(movie)}
                                    >
                                        <Like movie={movie} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginator
                    onPageSel={this.handlePageSel}
                    moviesDisplay={this.state.moviesDisplay}
                    navPagesDisp={this.state.navPagesDisp}
                    currentPage={this.state.currentPage}
                />
            </div>
        );
    }
}

export default Movies;
