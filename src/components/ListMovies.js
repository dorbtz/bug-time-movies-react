import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Moviecard from './Moviecard';
import {MOVIES_URL} from './request_utils';
import { Link } from "react-router-dom" ;
import GetRating from './getRating';
import moment from "moment"


const ListMovies = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(MOVIES_URL)
        .then(res => {
            console.log(res.data)
        setMovies(res.data.data)
        })
    

    }, [])

    const moviesDisplay = movies.map(movie => {
        const movie_url = `/details/${movie.id}`
        return(
              <div className="card movie_card" key={movie.id}>
                <img src={movie.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <Link to={movie_url}>            

                  <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                  </i>
                  </Link>
                  <h5 className="card-title">{movie.title}</h5><br></br>
                  <hr></hr>
                  <span className="movie_info">{moment(movie.year_of_production).format('YYYY/MM')}</span>
                  <GetRating key={movie.id} id={movie.id} />
                </div>
              </div>
        )
      })

    
return (
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{__html: "{font-family: 'Poppins', sans-serif}img {pointer-events: none;}.movie_card{padding: 0 !important;width: 20rem;margin:8px; border-radius: 10px;box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);}.movie_card img{border-top-left-radius: 10px;border-top-right-radius: 10px;height: 33rem;}.movie_info{color: #5e5c5c;}.movie_info i{font-size: 40px;}.card-title{width: 70%;height: 5rem;}.play_button{background-color: #ff3d49;   position: absolute;width: 60px;height: 60px;border-radius: 50%;right: 20px;bottom: 180px;font-size: 27px;padding-left: 21px;padding-top: 16px;color: #FFFFFF;cursor: pointer;}" }} />
        
        <div className="recentslider">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {moviesDisplay}
            </div>
          </div>
        </div>
    </div>
)
}

export default ListMovies