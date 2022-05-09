import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import {Row} from 'react-bootstrap'
import {MOVIES_URL} from './request_utils';
// import axiosInstance from "../axios";
import GetRate from './getRate';
import { Link } from "react-router-dom" ;
// import { FcRating } from "react-icons/fc";
const Moviecard = ({ movie }) => {

      const [movies, setMovies] = useState([])


      // useEffect(() => {
      //   axios.get(RATINGS_URL)
      //   .then(res => console.log(res.data))

      // }, [])

      useEffect(() => {
        axios.get(MOVIES_URL)
          .then(res => {
            console.log(res.data)
            setMovies(res.data.data)
          })
        
  
      }, [])

      const movie_url = `/movies/${movie.id}`


      // const ratingDisplay = ratings.map(ratings {
      //   console.log(ratings)
      // })

      const moviesDisplay = movies.map(movie => {
        const movie_url = `/movies/${movie.id}`
        return(
              <div className="card movie_card" key={movie.id}>
                <img src={movie.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <Link to={movie_url}>            

                  <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                  </i>
                  </Link>
                  <h5 className="card-title">{movie.title}</h5>
                  <span className="movie_info">{movie.year_of_production}</span>
                  <GetRate id={movie.id} />
                </div>
              </div>
        )
      })




  return (
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{__html: "{font-family: 'Poppins', sans-serif; -webkit-user-select: none; -moz-user-select: -moz-none; -o-user-select: none; user-select: none;}img {  -webkit-user-drag: none;  -moz-user-drag: none;  -o-user-drag: none;  user-drag: none;}img {pointer-events: none;}.movie_card{padding: 0 !important;width: 22rem;margin:14px; border-radius: 10px;box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);}.movie_card img{border-top-left-radius: 10px;border-top-right-radius: 10px;height: 33rem;}.movie_info{color: #5e5c5c;}.movie_info i{font-size: 20px;}.card-title{width: 80%;height: 4rem;}.play_button{background-color: #ff3d49;   position: absolute;width: 60px;height: 60px;border-radius: 50%;right: 20px;bottom: 111px;font-size: 27px;padding-left: 21px;padding-top: 16px;color: #FFFFFF;cursor: pointer;}.credits{margin-top: 20px;margin-bottom: 20px;border-radius: 8px;border: 2px solid #8e24aa;font-size: 18px;}.credits .card-body{padding: 0;}.credits p{padding-top: 15px;padding-left: 18px;}.credits .card-body i{color: #8e24aa;}" }} />


              <div className="card movie_card" key={movie.id}>
                <img src={movie.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <Link to={movie_url}>            

                  <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                  </i>
                  </Link>
                  <h5 className="card-title">{movie.title}</h5>
                  <span className="movie_info">{movie.year_of_production}</span>
                  <GetRate id={movie.id} />
                </div>
              </div>
              
        {/* {moviesDisplay} */}


    </div>
  )
}

export default Moviecard