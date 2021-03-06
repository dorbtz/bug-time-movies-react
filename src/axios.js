import axios from 'axios';



// const baseURL = "http://localhost:8000/"

const baseURL = "https://bugtimemovies.herokuapp.com"

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization : localStorage.getItem("token")
        ? "Token " + localStorage.getItem("token")
        : null,
        "Content-Type": "application/json",
        accept: "application/json"
        },
});

// const moviesURL = `${axiosInstance.baseURL}/movies/`

// const movieDeleteURL = `${moviesURL}/${id}/delete`

export default axiosInstance;