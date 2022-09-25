import React from "react";

const Genres = (props) => {
    const { currentGenre, genres, onGenreChange } = props;

    return (
        <ul className="list-group">
            <li
                className={
                    currentGenre !== "All"
                        ? "list-group-item"
                        : "list-group-item active"
                }
                onClick={() => onGenreChange('All')}
            >
                All Genres
            </li>
            {genres.map((genre) => (
                <li
                    key={genre._id}
                    onClick={() => onGenreChange(genre.name)}
                    className={renderClass(genre)}
                >
                    {genre.name}
                </li>
            ))}
        </ul>
    );

    function renderClass(genre) {
        return genre.name !== currentGenre
            ? "list-group-item"
            : "list-group-item active";
    }
};

export default Genres;
