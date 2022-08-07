import React, {useState, useEffect} from 'react';
import {MOVIE_DETAIL_URL, MOVIES_URL, getHeader, CURRENT_USER} from './request_utils';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import YoutubeEmbed from './Youtube';
import {Row, Col} from 'react-bootstrap'
import GetRate from './getRate';
import { Link } from "react-router-dom" ;
import GetRating from './getRating';
import moment from "moment"
import {toast} from 'react-toastify';
// import { IoRemoveCircleSharp } from "react-icons/io5";
// import { toast } from 'react-toastify';
// import {FaCheckCircle} from 'react-icons/fa';
import GetComments from './getComments'
import Button from '@mui/material/Button';
import { AddMovie } from './AddMovie';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
// import EditIcon from '@mui/icons-material/Edit';
import axiosInstance from '../axios';
import UpdateMovie from './UpdateMovie';

const MovieDetails = () => {

    // const [show, setShow] = useState([])
    const [movie, setMovie] = useState([])
    // const [data, setData] = useState([])
    const [related, setRelated] = useState([])
    const [user, setUser] = useState([])
    const {id} = useParams()
    // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect (() => {
        axiosInstance
        .get(CURRENT_USER)
        .then(res => setUser(res.data))
    }, [])

    useEffect(() =>
    {
        axios.get(`${MOVIE_DETAIL_URL}${id}`)
            .then(res => setMovie(res.data))
    }, [id])


    useEffect(() =>
    {
        axios.get(MOVIES_URL)
            .then(res => setRelated(res.data.data))
    }, [])

    const deleteMovie = () => {
        axios.delete(`${MOVIE_DETAIL_URL}${id}`, getHeader())
            .then(res => setMovie(res.data), 
            toast(`Movie deleted successfuly`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                icon: "✅"
            }))
    }
    
    

    const relatedMovies = related.filter(related => related.id !== movie.id && related.category === movie.category).map(filteredMovie => {
        const filteredMovie_url = `/details/${filteredMovie.id}`
        return(
            <Row key={filteredMovie.id}>
                <Col>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
                    <style dangerouslySetInnerHTML={{__html: "{font-family: 'Poppins'}img {pointer-events: none;}.movie_card{padding: 0 !important;width: 12rem;margin:14px; border-radius: 10px;box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);}.movie_card img{border-top-left-radius: 10px;border-top-right-radius: 10px;height: 15rem;}.movie_info{color: #black;}.movie_info i{font-size: 20px;}.card-title{width: 80%;height: 4rem;}.play_button{background-color: #ff3d49;   position: absolute;width: 60px;height: 60px;border-radius: 50%;right: 10px;bottom: 155px;font-size: 27px;padding-left: 21px;padding-top: 16px;color: #FFFFFF;cursor: pointer;}" }} />

                    <div className="card movie_card" key={filteredMovie.id}>
                        <img src={filteredMovie.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                        <Link to={filteredMovie_url}>          

                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                        </i>
                        </Link>
                        <h5 className="card-title">{filteredMovie.title}</h5><br></br>
                        <hr></hr>
                        <span className="movie_info">{moment(movie.year_of_production).format('YYYY/MM')}</span>
                        <GetRating key={filteredMovie.id} id={filteredMovie.id} />
                        </div>
                    </div>                
                </Col>
            </Row>
        )
    })

    
    return (
    <div key={movie.id}>
        <main className="content">
            {window.localStorage.getItem(["token"]) && user.is_staff ?
            <div className="btn btn">
            <h1 className="m-3">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                    m: 1,
                    },
                }}
                >
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button startIcon={"⛔"} color="error" onClick={() => deleteMovie(id)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > *': {
                        m: 1,
                        },
                    }}
                    >
                        Delete
                    </Button>

                    <UpdateMovie />

                    <AddMovie />
                </ButtonGroup>
            </Box>
            </h1>
            </div>
            : null}
        <div className="single">
            <section className="trailer">
            <h5>{movie.title} ({moment(movie.year_of_production).format('YYYY')})</h5>
            <br></br>
            <div className="trailer_frame">
            <YoutubeEmbed link={movie.movie_trailer} />
            </div>
            </section>
            <section className="movie">
                <Row>
                    <Col xs={{ order: '2' }}>
                        <h5>Rating: <GetRate key={movie.id} id={id} title={movie.title}/>
                        </h5>
                    </Col>
                </Row>
                <br></br>
                <h4>Description</h4>
                <p>{movie.description}</p>
                <h5>Genre:</h5>
                <p>{movie.category}</p>
            </section>
            <section>
                <h4>Cast</h4>
                {movie.cast}
            </section>
            {/* <section>
                <img alt="" src={movie.banner} />
            </section> */}
            <hr></hr>
            <section className="comments">
                <h3>Recent comments:</h3>
                <GetComments key={id} id={id} />
            </section>
            <hr></hr>
            <section className="related">
            <h3>Related Movies</h3>
            {/* {'{'}% for movie in related_movies %{'}'} */}
            <div className="recentslider">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {relatedMovies}
                    </div>
                </div>
            </div>
            {/* {'{'}% endfor %{'}'} */}
            </section>
        </div>
        </main>
    </div>
)
}

export default MovieDetails