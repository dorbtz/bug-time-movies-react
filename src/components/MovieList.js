import React from 'react';
import {MOVIES_PER_PAGE} from './Constants';
import Moviecard from './Moviecard';

const MovieList = ({movies, page}) => {
  const startIndex = ( page - 1 ) * MOVIES_PER_PAGE;
  const selectedMovies = movies.slice(startIndex, startIndex + MOVIES_PER_PAGE);
  
  return selectedMovies.map(movie => (
    <Moviecard movie={movie} key={movie.id} page={page}/>
  ))
}

export default MovieList