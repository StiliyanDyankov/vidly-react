import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovies } from "./../services/movieService";

class MovieForm extends Form {
    state = {
        data: {
            _id: "",
            name: "",
            genre: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        errors: {},
    };

    componentDidMount() {
        this.willRenderMovieData();
    }

    willRenderMovieData = () => {
        if (this.props.match.params.id) {
            this.renderMovieData(this.props.match.params.id);
            return true;
        } else return false;
    };

    renderMovieData = (id) => {
        let intStateData = { ...this.state };
        const movies = [...getMovies()];
        let movie = { ...movies.find((m) => m._id === id) };

        intStateData.data._id = movie._id;
        intStateData.data.name = movie.title;
        intStateData.data.genre = movie.genre.name;
        intStateData.data.numberInStock = movie.numberInStock;
        intStateData.data.dailyRentalRate = movie.dailyRentalRate;
        this.setState({ intStateData });
    };

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.history.replace("/movies");
    };

    schema = {
        _id: Joi,
        name: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(1)
            .max(100)
            .label("Number in stock"),
        dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate"),
    };

    render() {
        const genres = getGenres();

        return (
            <div>
                <h1>Movie Form </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Title")}
                    {this.renderSelect("genre", "Genre", genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Submit")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
