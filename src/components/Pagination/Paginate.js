import React, {useEffect, useState} from 'react'
// import Pagination from 'react-bootstrap/Pagination'
import axios from 'axios'
import { MOVIES_URL } from '../request_utils';
import MovieList from '../MovieList';
import Paginationor from './Paginationor'
import { MOVIES_PER_PAGE } from '../Constants';


const Paginate = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    console.log(totalPages)


    useEffect(() => {
    const fetchMovies = async () => {
    setLoading(true);
    const res = await axios.get(MOVIES_URL);
    setLoading(false)
    setMovies(res.data)
    console.log(setMovies)

    setTotalPages(Math.ceil(res.data.length / MOVIES_PER_PAGE));
    };
    fetchMovies();
    }, []);


  return (
    <div>
        { loading ? <p>Loading ...</p> : 
          <section>
            <div className="swiper-wrapper">
              <MovieList movies={movies} page={page}/>
            </div>
            <Paginationor /> 
          </section>
        }
    </div>
  )
}

export default Paginate