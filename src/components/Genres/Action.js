import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {MOVIES_URL} from '../request_utils';
import GetRate from '../getRate';
import { Link } from "react-router-dom" ;
import moment from "moment";
// import { Row, Col } from 'react-bootstrap';

export const Action = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        getData();
    }, [])
    
    const getData = () => {
        axios.get(MOVIES_URL).then((res) => 
        {
        setMovies(res.data.data)}
        );
    }

    const filterGenre = movies.filter(movie => movie.category === 'action').map(filteredMovie => {
      const filteredMovie_url = `/details/${filteredMovie.id}`

      return(

                    <div className="card movie_card" key={filteredMovie.id}>
                        <img src={filteredMovie.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                        <Link to={filteredMovie_url}>            

                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                        </i>
                        </Link>
                        <h5 className="card-title">{filteredMovie.title}</h5>
                        <span className="movie_info">{moment(filteredMovie.year_of_production).format('YYYY/MM')}</span>
                        <GetRate id={filteredMovie.id} />
                        </div>
                    </div>
      )
  })


  return (
    <div>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" />
        <style dangerouslySetInnerHTML={{__html: "{font-family: 'Poppins', sans-serif; -webkit-user-select: none; -moz-user-select: -moz-none; -o-user-select: none; user-select: none;}img {  -webkit-user-drag: none;  -moz-user-drag: none;  -o-user-drag: none;  user-drag: none;}img {pointer-events: none;}.movie_card{padding: 0 !important;width: 20rem;margin:14px; border-radius: 10px;box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);}.movie_card img{border-top-left-radius: 8px;border-top-right-radius: 8px;height: 30rem;}.movie_info{color: #5e5c5c;}.movie_info i{font-size: 15px;}.card-title{width: 75%;height: 3.5rem;}.play_button{background-color: #ff3d49;   position: absolute;width: 60px;height: 60px;border-radius: 50%;right: 20px;bottom: 111px;font-size: 27px;padding-left: 21px;padding-top: 16px;color: #FFFFFF;cursor: pointer;}" }} />

      Action
      <div className="recentslider">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {filterGenre}
          </div>
        </div>
      </div>
    </div>
  )
}
