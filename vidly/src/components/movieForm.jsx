import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { addMovie, getMovies, updateMovie } from "./../services/movieService";

class MovieForm extends Form {
    state = {
        data: {
            _id: "",
            name: "",
            genre: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        genres: [],
        errors: {},
    };

    async componentDidMount() {
        console.log(1);
        this.willRenderMovieData();
        console.log(2);
        const genres = await getGenres();
        console.log(genres);
        this.setState({ genres });
    }

    willRenderMovieData = () => {
        if (this.props.match.params.id) {
            this.renderMovieData(this.props.match.params.id);
            return true;
        } else return false;
    };

    renderMovieData = async (id) => {
        let intStateData = { ...this.state };
        const movies = [...(await getMovies())];
        let movie = { ...movies.find((m) => m._id === id) };

        intStateData.data._id = movie._id;
        intStateData.data.name = movie.title;
        intStateData.data.genre = movie.genre.name;
        intStateData.data.numberInStock = movie.numberInStock;
        intStateData.data.dailyRentalRate = movie.dailyRentalRate;
        this.setState({ intStateData });
    };

    doSubmit = async () => {
        if (this.props.match.params.id) {
            await updateMovie(this.state.data);
        } else await addMovie(this.state.data);
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
        console.log(this.state.genres);
        return (
            <div>
                <h1>Movie Form </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Title")}
                    {this.renderSelect("genre", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Submit")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
