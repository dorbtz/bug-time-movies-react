import React, {useState, useEffect} from 'react';
import {MOVIE_DETAIL_URL, MOVIES_URL, getHeader} from './request_utils';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import YoutubeEmbed from './Youtube';
import {Row, Col, Button} from 'react-bootstrap'
// import axiosInstance from "../axios"
import GetRate from './getRate';
// import { Title } from '@mui/icons-material';
import { Link } from "react-router-dom" ;
import moment from "moment"
// import moviesDeleteURL from "./axios";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
// import { toast } from 'react-toastify';
// import {FaCheckCircle} from 'react-icons/fa';
// import {getHeader} from "./request_utils"

const MovieDetails = () => {

    const [show, setShow] = useState([])
    const [movie, setMovie] = useState([])
    const [related, setRelated] = useState([])
    const {id} = useParams()
    useEffect(() =>
    {
        console.log(`${MOVIE_DETAIL_URL}${id}`)
        axios.get(`${MOVIE_DETAIL_URL}${id}`)
            .then(res => setMovie(res.data))
    }, [])
    
    useEffect(() => {
        getData();
    }, [])

    // useEffect(() =>
    // {
    //     console.log(`${MOVIE_CAST_URL}${id}`)
    //     axios.get(`${MOVIE_CAST_URL}${id}`)
    //         .then(res => setMovie(res.data))
    // }, [])
    
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(MOVIES_URL).then((res) => 
        {
        setRelated(res.data.data)}
        );
    }

    const deleteMovie = () => {
        console.log(`${MOVIE_DETAIL_URL}${id}`)
        axios.delete(`${MOVIE_DETAIL_URL}${id}`, getHeader())
            .then(res => setMovie(res.data))
    }

    const handleEditOpen = () => {
        console.log('called handle Edit Open')
        setShow({showModal: true})
        axios.put(`${MOVIE_DETAIL_URL}${id}`, getHeader())
            .then(res => setMovie(res.data))
    }


    // const editMovie = () => {
    //     console.log(`${MOVIE_DETAIL_URL}${id}/edit`)
    //     axios.put(`${MOVIE_DETAIL_URL}${id}/edit`)
    //         .then(res => console.log(setMovie(res.data)))
    // }
    /// make delete function work

    const relatedMovies = related.filter(related => related.category === movie.category).map(filteredMovie => {
        const filteredMovie_url = `/details/${filteredMovie.id}`
        return(
            <Row>
                <Col>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
                    <style dangerouslySetInnerHTML={{__html: "{font-family: 'Poppins', sans-serif; -webkit-user-select: none; -moz-user-select: -moz-none; -o-user-select: none; user-select: none;}img {-webkit-user-drag: none;-moz-user-drag: none;-o-user-drag: none;user-drag: none;}img {pointer-events: none;}.movie_card{padding: 0 !important;width: 12rem;margin:14px; border-radius: 10px;box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);}.movie_card img{border-top-left-radius: 10px;border-top-right-radius: 10px;height: 15rem;}.movie_info{color: #5e5c5c; display: flex;}.movie_info i{font-size: 25px;}.card-title{width: 80%;height: 4rem;}.play_button{background-color: #ff3d49;   position: absolute;width: 60px;height: 60px;border-radius: 50%;right: 20px;bottom: 111px;font-size: 27px;padding-left: 21px;padding-top: 16px;color: #FFFFFF;cursor: pointer;}.credits{margin-top: 20px;margin-bottom: 20px;border-radius: 8px;border: 2px solid #8e24aa;font-size: 18px;}.credits .card-body{padding: 0;}.credits p{padding-top: 15px;padding-left: 18px;}.credits .card-body i{color: #8e24aa;}" }} />

                    <div className="card movie_card" key={filteredMovie.id}>
                        <img src={filteredMovie.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                        <Link to={filteredMovie_url}>            

                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                        </i>
                        </Link>
                        <h5 className="card-title">{filteredMovie.title}</h5>
                        <span className="movie_info">{filteredMovie.year_of_production}</span>
                        <GetRate id={filteredMovie.id} />
                        </div>
                    </div>                
                </Col>
            </Row>
        )
    })


return (
    <div>
        <main className="content">
            <div className="btn btn">
            <h1 className="m-3"> 
            <span>
                <Button className="m-3" onClick={handleEditOpen}>
                    Edit <FiEdit/>
                </Button>
            </span>
            <span>
                <Button variant="danger" onClick={() => deleteMovie(id)}>
                    Delete <IoRemoveCircleSharp/>
                </Button>
            </span>
            </h1>
             {/* <Button variant="info" onClick={() => editMovie(id)}> Edit <FiEdit/> </Button> */}
            </div>
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
                        <h5>Rating: </h5>
                        <p><GetRate id={id} /></p>
                    </Col>
                    <Col xs={{ order: '1' }}>
                        <h5>Views: </h5>
                        <p>{movie.views_count}</p>
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
            <section className="related">
            <h3>Related Movies</h3>
            {/* {'{'}% for movie in related_movies %{'}'} */}
            <div className="relatemovie">
                {relatedMovies}
            </div>
            {/* {'{'}% endfor %{'}'} */}
            </section>
        </div>
        </main>
    </div>
)
}

export default MovieDetails