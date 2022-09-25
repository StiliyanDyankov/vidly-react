import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
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

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    render() {
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, movies: allMovies } = this.state;

        if (count === 0) return <p>There are no movies in the DB.</p>;

        const movies = paginate(allMovies, currentPage, pageSize);

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
                        {movies.map((movie) => (
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
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </div>
        );
    }
}

export default Movies;
