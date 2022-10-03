import axios from "axios";

const genresAPI = "http://localhost:3900/api/genres";

export async function getGenres() {
    const { data: genres } = await axios.get(genresAPI);
    return genres;
}