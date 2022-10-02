import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBar from "./common/searchBar";
import { search } from "./../utils/search";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 3,
        sortColumn: { path: "title", order: "asc" },
        searchInput: "",
    };

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter((m) => m._id !== movie._id);
        let currentPage = this.state.currentPage;
        console.log(this.getPagedData().totalCount);
        if (this.getPagedData().totalCount % this.state.pageSize === 1) {
            currentPage = this.state.currentPage - 1;
        }

        this.setState({ movies, currentPage });
    };

    handleLike = (movie) => {
        let movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].isLiked = !movies[index].isLiked;
        this.setState({ movies });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    handleSearch = ({ currentTarget: { value: input } }) => {
        this.handleGenreSelect("All Genres");
        this.setState({ searchInput: input });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            movies: allMovies,
            searchInput,
        } = this.state;

        const searched = search(searchInput, allMovies);

        const filtered =
            selectedGenre && selectedGenre._id
                ? searched.filter((m) => m.genre._id === selectedGenre._id)
                : searched;

        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };

    render() {
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, sortColumn, searchInput } = this.state;

        if (count === 0) return <p>There are no movies in the DB.</p>;

        const { totalCount, data: movies } = this.getPagedData();

        return (
            <div className="row">
                <div className="col-3 row">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>

                <div className="col-9">
                    <Link to="/movieForm" className="btn btn-primary mb-3">
                        Add Movie
                    </Link>
                    {totalCount === 0 ? (
                        <p>No matches found</p>
                    ) : (
                        <p>Showing {totalCount} movies</p>
                    )}
                    <SearchBar
                        onSearch={this.handleSearch}
                        searchInput={searchInput}
                    />
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
