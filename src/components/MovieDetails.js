import React, {useState, useEffect} from 'react';
import {MOVIE_DETAIL_URL, MOVIES_URL, getHeader, MOVIE_COMMENTS_URL, COMMENT_URL, RATE_MOVIE_URL} from './request_utils';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import YoutubeEmbed from './Youtube';
import {Row, Col, Button, Form, Modal, ModalBody, ModalFooter} from 'react-bootstrap'
import GetRate from './getRate';
import { Link } from "react-router-dom" ;
import moment from "moment"
import { IoRemoveCircleSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { toast } from 'react-toastify';
import {FaCheckCircle} from 'react-icons/fa';
import GetComments from './getComments'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import RangeSlider from 'react-bootstrap-range-slider';


const MovieDetails = () => {

    const [show, setShow] = useState([])
    const [movie, setMovie] = useState([])
    const [related, setRelated] = useState([])
    // const [comment, setComment] = useState([])
    const [rate, setRate] = useState(0)
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
            .then(window.location.href="/")
    }


    const handleEditSave = () => {
        console.log('called handleSaveNew')
        const editedmovie = {title: setMovie.movie.title,
            description: setMovie.movie.description,
            image: setMovie.movie.image,
            director: setMovie.movie.director,
            category: setMovie.movie.category,
            language: setMovie.movie.language,
            status: setMovie.movie.status,
            cast: setMovie.movie.cast,
            year_of_production: setMovie.movie.year_of_production,
            views_count: setMovie.movie.views_count,
            movie_trailer: setMovie.movie.movie_trailer,
        }
        axios.put(`${MOVIE_DETAIL_URL}${id}`,
            editedmovie, 
            getHeader()
        )
        .then(response => {
            if (response.status === 201) {
                getData();
            }
        })
        setShow({showModal: false})
        toast("The movie Updated Successfuly", {
            theme: "green",
            icon: <FaCheckCircle />
        })
    }

    const handleEditOpen = () => {
        console.log('called handleEditOpen')
        setShow({showModal: true})
    }

    const handleRate = () => {
        console.log()
        axios.post(RATE_MOVIE_URL, {
            movie: movie.id,
            rating: rate.rating
        })
    }

    const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Rate {movie.title}</Popover.Header>
        <Popover.Body>
            <RangeSlider
                value={rate}
                onChange={changeEvent => setRate(changeEvent.target.value)}
            ><Button color="primary" onClick={handleRate}>Save</Button></RangeSlider>
        </Popover.Body>
    </Popover>
    );

    
    

    const relatedMovies = related.filter(related => related.category === movie.category).map(filteredMovie => {
        const filteredMovie_url = `/details/${filteredMovie.id}`
        return(
            <Row>
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
                        <h5 className="card-title">{filteredMovie.title}</h5><br></br><br></br>
                        <span className="movie_info">{filteredMovie.year_of_production}</span>
                        <GetRate key={filteredMovie.id} id={filteredMovie.id} />
                        </div>
                    </div>                
                </Col>
            </Row>
        )
    })

    // const MovieComments = comments.map(comment => {
    //     return(
    //         <Row>
    //             <Col>
    //                 <p>{comment.sender_username}: {comment.content}
    //                 <br></br>
    //                 <hr></hr>
    //                 {comment.created_at}
    //                 </p>
    //             </Col>
    //         </Row>
    //     )
    // })
    
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
                        <h5>Rating: <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                        <Button>Rate this movie</Button>
                                    </OverlayTrigger> | <GetRate id={id} />
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
                <h3>People comment:</h3>
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

        <Modal show={show.showModal} 
                    onHide={() => setShow({showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit {movie.slug}'s movie</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's Title" 
                                        value={movie.title}
                                        onChange={(event) => setMovie({title: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>
                    
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Image/Poster</Form.Label>
                                <Form.Control type="file" 
                                value={movie.Image} />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Banner</Form.Label>
                                <Form.Control type="file" size='sm'
                                value={movie.Banner}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's description" 
                                        value={movie.description}
                                        onChange={(event) => setMovie({description: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select aria-label="Floating label select example" value={movie.category} onChange={(event) => setMovie({category: event.target.value})}>
                                    <option value="none">Genres</option>
                                    <option value="action">ACTION</option>
                                    <option value="adventure">ADVENTURE</option>
                                    <option value="animated">ANIMATED</option>
                                    <option value="comedy">COMEDY</option>
                                    <option value="crime">CRIME</option>
                                    <option value="drama">DRAMA</option>
                                    <option value="fantasy">FANTASY</option>
                                    <option value="horror">HORROR</option>
                                    <option value="historical">HISTORICAL</option>
                                    <option value="romance">ROMANCE</option>
                                    <option value="western">WESTERN</option>
                                    <option value="science-fiction">SCIENCE FICTION</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Language</Form.Label>
                                <Form.Select aria-label="Floating label select example" value={movie.language} 
                                onChange={(event) => setMovie({language: event.target.value})}>
                                <option value="english">English</option>
                                <option value="hebrew">Hebrew</option>
                                <option value="english">Spanish</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Floating label select example" value={movie.status} 
                                onChange={(event) => setMovie({status: event.target.value})} >
                                <option value="recently-added">Recently added</option>
                                <option value="top-rated">Top rated</option>
                                <option value="most-watched">Most watched</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cast</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's cast" 
                                        value={movie.cast}
                                        onChange={(event) => setMovie({cast: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Release Date</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="date" placeholder="Enter Movie's release date" 
                                        value={movie.year_of_production}
                                        onChange={(event) => setMovie({year_of_production: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Trailer Link</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="url" placeholder="Enter Trailer's URL" 
                                        value={movie.movie_trailer}
                                        onChange={(event) => setMovie({movie_trailer: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleEditSave.bind(movie)}>Save</Button>
                    </ModalFooter>
        </Modal>
        </main>
    </div>
)
}

export default MovieDetails