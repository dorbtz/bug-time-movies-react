import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import { MOVIES_URL } from './request_utils';
import GetRate from './getRate';
import { Link } from "react-router-dom" ;
import {Container, Carousel} from 'react-bootstrap'
// import {Carousel, Container} from 'react-bootstrap'
import moment from 'moment';
// import { BASE_PATH, CURRENT_USER} from './request_utils'


const Homepage = () => {

    const [movies, setMovies] = useState([])
    // const getMovies = async () => {
    //     const params = {page: 1}
    //     try {
    //         const response = await  
    //     }
    // }

    useEffect(() => {
        getData();
    }, [])
    
    const getData = () => {
        axios.get(MOVIES_URL).then((res) => 
        {
        console.log(res.data.data)
        setMovies(res.data.data)}
        );
    }

    const recentlyAddedMovies = movies.filter(movie => movie.status === 'recently-added').map(filteredMovie => {
        const filteredMovie_url = `/details/${filteredMovie.id}`

        return(
                    <div className="card movie_card" key={filteredMovie.id}>
                        <img src={filteredMovie.image} className="card-img-top" alt={filteredMovie.slug + "-img"} />
                        <div className="card-body">
                        <Link to={filteredMovie_url}>            

                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="More Details">
                        </i>
                        </Link>
                        <h5 className="card-title">{filteredMovie.title}</h5><br></br>
                        <hr></hr>
                        <span className="movie_info">{moment(filteredMovie.year_of_production).format('YYYY/MM')}</span>
                        <GetRate id={filteredMovie.id} />
                        </div>
                    </div>
        )
    })

    const mostWatchedMovies = movies.filter(movie => movie.status === 'most-watched').map(filteredMovie => {
        const filteredMovie_url = `/details/${filteredMovie.id}`
        return(
                    <div className="card movie_card" key={filteredMovie.id}>
                        <img src={filteredMovie.image} className="card-img-top" alt={filteredMovie.slug + "-img"} />
                        <div className="card-body">
                        <Link to={filteredMovie_url}>            

                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="More Details">
                        </i>
                        </Link>
                        <h5 className="card-title">{filteredMovie.title}</h5><br></br>
                        <hr></hr>
                        <span className="movie_info">{moment(filteredMovie.year_of_production).format('YYYY/MM')}</span>
                        <GetRate id={filteredMovie.id} />
                        </div>
                    </div>                
        )
    })

    const topRatedMovies = movies.filter(movie => movie.status === 'top-rated').map(filteredMovie => {
        const filteredMovie_url = `/details/${filteredMovie.id}`
        return(
        
                    <div className="card movie_card" key={filteredMovie.id}>
                        <img src={filteredMovie.image} className="card-img-top" alt={filteredMovie.slug + "-img"} />
                        <div className="card-body">
                        <Link to={filteredMovie_url}>            

                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="More Details">
                        </i>
                        </Link>
                        <h5 className="card-title">{filteredMovie.title}</h5><br></br>
                        <hr></hr>
                        <span className="movie_info">{moment(filteredMovie.year_of_production).format('YYYY/MM')}</span>
                        <GetRate id={filteredMovie.id} />
                        </div>
                    </div>                
        )
    })

    const featuredMovies = movies.filter((movie => movie.created)).map(filteredMovie => {

        return(
        
            <Carousel.Item interval={2800} key={filteredMovie.id}>
                            <img style={{
                                display: "block",
                                height: "450px",
                                maxwidth: "100%",
                            }}
                                className="d-block w-100 card-image"
                                src={filteredMovie.banner}
                                alt={filteredMovie.title}
                            />
                            <Carousel.Caption>
                                {/* <h5 className={'caption'}>{filteredMovie.title}</h5> */}
                                {/* <p className={'caption'}>{filteredMovie.description}</p> */}
                            </Carousel.Caption>
            </Carousel.Item>
        )
    })

return (
    
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{__html: "{font-family: 'Poppins', sans-serif; }.movie_card{width: 15rem; margin:5px; border-radius: 10px; box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);}.movie_card img{border-top-left-radius: 8px;border-top-right-radius: 8px;height: 18rem;}.movie_info{color: #5e5c5c; }.movie_info i{font-size: 20px;}.card-title{width: 72%;height: 5rem;}.play_button{background-color: #ff3d49;   position: absolute;width: 60px;height: 60px;border-radius: 50%;right: 15px;bottom: 180px;font-size: 27px;padding-left: 21px;padding-top: 16px;color: #FFFFFF;cursor: pointer;}" }} />

        <main className="content">

            <section className="panel">
                <h2>Recently Added</h2>
                <div className="recentslider">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {recentlyAddedMovies}
                        </div>
                        <div className="nextdirection recent-next"><img alt="" src="img/right-arrow.svg" /></div>
                        <div className="leftdirection recent-prev"><img alt="" src="img/left-arrow.svg" /></div>
                    </div>
                </div>
            </section>

            <hr></hr>

            <section className="panel">
                <h2>Most Watched</h2>
                <div className="recentslider">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {mostWatchedMovies}
                        </div>
                        <div className="nextdirection recent-next"><img alt="" src="img/right-arrow.svg" /></div>
                        <div className="leftdirection recent-prev"><img alt="" src="img/left-arrow.svg" /></div>
                    </div>
                </div>
            </section>

            <hr></hr>

            <section className="panel">
                <h2>Top Rated</h2>
                <div className="recentslider">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {topRatedMovies}
                        </div>
                        <div className="nextdirection recent-next"><img alt="" src="img/right-arrow.svg" /></div>
                        <div className="leftdirection recent-prev"><img alt="" src="img/left-arrow.svg" /></div>
                    </div>
                </div>
            </section>

            <Container style={{alignItems: "center", height: '100%', width: '100%'}}>
                    <h3 style={{textAlign: "center"}}>Featured Movies</h3>
                    <Carousel variant={"dark"} fade={true} className={"center-carousal"}>
                        {featuredMovies}
                    </Carousel>
                </Container>

        </main>
    </div>
  )
}

export default Homepage