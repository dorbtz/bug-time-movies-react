// import axios from "axios"

export const BASE_PATH = "http://127.0.0.1:8000"

export const MOVIES_URL = `${BASE_PATH}/movies`

export const ADD_MOVIES_URL = `${BASE_PATH}/movies/add`

export const MOVIE_DETAIL_URL = `${BASE_PATH}/movies/`

export const GENRES_URL = `${BASE_PATH}/genres`

export const LANGUAGE_URL = `${BASE_PATH}/language/<str:lang>`

export const CURRENT_USER = `${BASE_PATH}/users/current`

export const USER_PROFILE = `${BASE_PATH}/user_profile/current`

export const COMMENTS_URL = `${BASE_PATH}/comments`

export const RATINGS_URL = `${BASE_PATH}/ratings`

export const SEARCH_URL = `${BASE_PATH}/search/`

export const USER_REGISTRATION = `${BASE_PATH}/register/`

export const TOKEN = `${BASE_PATH}/token/`

export function getHeader() {
    const token = window.localStorage.getItem('token')
    if (!token) {
        // go to login
        window.location.href = `${BASE_PATH}/login`
    }
    return {headers: {Authorization: 'Token ' + token}}
}