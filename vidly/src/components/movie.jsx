import React from "react";

const Movie = ({match}) => {
    return (
        <div>
            <h1>Movie Form {match.params.id}</h1>
            <button className="btn btn-sm btn-regurlar">Save</button>
        </div>
    );
};

export default Movie;
