import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
    state = {
        movies: [], // it contains all the movies to be displayed on the page
        genres: [], // it contains all the genres, of which each movie is a representative of, to be displayed on the sidebar
        currentPage: 1, // pagination - it stores information about on what page are we
        pageSize: 3, // pagination - information about how many movies should be displayed per page
        sortColumn: { path: 'title', order: "asc" }, // sorting - info about which column is used as a metric for sorting and what is the order 
    };

    componentDidMount() { // upon loading the component - Movies - on the page
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]; // genre service - store a universal genre and the returned genres in obj

        this.setState({ movies: getMovies(), genres }); // movies service - populate state with returned movies and genres obj
    }

    handleDelete = (movie) => { // upon triggering the Delete event / takes a movie obj argument
        const movies = this.state.movies.filter(m => m._id !== movie._id); // filter state movies obj based on whether passed obj has a matching id and store it in var 
        let currentPage = this.state.currentPage;
        console.log(this.getPagedData().totalCount)
        if(this.getPagedData().totalCount%this.state.pageSize===1) {
            currentPage = this.state.currentPage - 1;
        }

        this.setState({ movies, currentPage}); // set the state with new filtered movies

    };

    handleLike = (movie) => { // upon triggering the Like event / takes a movie obj
        let movies = [...this.state.movies]; // copies the current state into internal movies
        const index = movies.indexOf(movie); // gets the index of passed movie obj in internal movies
        movies[index] = { ...movies[index] }; // ?
        movies[index].isLiked = !movies[index].isLiked; // sets the value of isLiked of (index el of internal movies)/the arg to the opposite
        this.setState({ movies }); // sets the state to the changed internal movies obj
    };

    handlePageChange = (page) => { // upon triggering the PageChange event / takes a page num
        this.setState({ currentPage: page }); // sets the state of current page to the passed number
    };

    handleGenreSelect = (genre) => { // upon triggering the GenreSelect event / takes a genre obj
        this.setState({ selectedGenre: genre, currentPage: 1 }); // creates a new state var - selectedGenre - sets it to passed string genre and currentPage to 1
    };

    handleSort = (sortColumn) => { // upon triggering the Sort event / takes a sortColumn obj
        this.setState({sortColumn}); // sets the state to new sortColumn obj - new genre and new order
    };

    getPagedData = () => { // method
        const {
          pageSize,
          currentPage,
          sortColumn,
          selectedGenre,
          movies: allMovies
        } = this.state; // obj destructuring
    
        const filtered = 
          selectedGenre && selectedGenre._id // if selectedGenre exists and it has a non-empty id property
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) // true - return all the movies in the state from that genre
            : allMovies; // false - return all movies
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); // sort all the genre-filtered movies by a property ([sortColumn.path]) in a given order
    
        const movies = paginate(sorted, currentPage, pageSize); // cut the sorted movies in pieces of a given size and take corresponding piece (currentPage)
    
        return { totalCount: filtered.length, data: movies }; // return the array of movies, that have went through the pipeline and the length of it
      };

    render() {
        const { length: count } = this.state.movies;
        const {
            currentPage,
            pageSize,
            sortColumn,
        } = this.state;

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
                    <p>Showing {totalCount} movies.</p>
                        <Link to='/movieForm' className="btn btn-primary">
                            Add Movie
                        </Link>
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
