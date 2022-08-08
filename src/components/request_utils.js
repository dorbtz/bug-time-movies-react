// import axios from "axios"

// export const BASE_PATH = 'https://bugtimemovies.herokuapp.com'

export const BASE_PATH = "https://bugtimemovies.herokuapp.com"

export const MOVIES_URL = `${BASE_PATH}/movies`

export const ADD_MOVIES_URL = `${BASE_PATH}/movies/add`

export const MOVIE_DETAIL_URL = `${BASE_PATH}/movies/`

export const MOVIE_SEARCH_URL = `${BASE_PATH}/movies/?search=`

export const MOVIE_COMMENTS_URL = `${BASE_PATH}/all_comments/`

export const COMMENT_URL = `${BASE_PATH}/comment/`

export const UPDATE_COMMENT_URL = `${BASE_PATH}/comments/edit/`

export const RATE_MOVIE_URL = `${BASE_PATH}/rate/`

// export const ACTION_GENRE_URL = `${BASE_PATH}/movies/?category=action`

export const YEAR_URL = `${BASE_PATH}/movies/?year=`

export const GENRES_URL = `${BASE_PATH}/genres`

export const LANGUAGE_URL = `${BASE_PATH}/language/<str:lang>`

export const CURRENT_USER = `${BASE_PATH}/users/current`

export const USER_PROFILE = `${BASE_PATH}/user_profile/current`

export const COMMENTS_URL = `${BASE_PATH}/comments`

export const RATINGS_URL = `${BASE_PATH}/ratings`

export const SEARCH_URL = `${BASE_PATH}/search/`

export const USER_REGISTRATION = `${BASE_PATH}/register/`

export const TOKEN = `${BASE_PATH}/token/`

export const NO_POSTER_URL = "https://screench.com/upload/no-poster.jpeg"

export const NO_BANNER_URL = "https://i.postimg.cc/D06BsSpB/bugtime-movies.jpg"

export function getHeader() {
    const token = window.localStorage.getItem('token')
    try { if (!token) {
        // go to login
        window.location.href = `${BASE_PATH}/login`
    }
    return {headers: {Authorization: 'Token ' + token}}
    } catch (error) {
        throw Error('could not find token, no username', error);
    }
}