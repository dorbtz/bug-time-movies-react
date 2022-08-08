import React, {useState, useEffect, useReducer} from 'react';
import {MOVIE_DETAIL_URL} from './request_utils';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Form, Modal, ModalBody, ModalFooter} from 'react-bootstrap'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import axiosInstance from '../axios';

function UpdateMovie() {

    const [show, setShow] = useState([])
    const [movie, setMovie] = useState([])
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const {id} = useParams()
    // const [data, setData] = useState({
    //     title: "",
    //     description: "",
    //     image: "",
    //     banner: "",
    //     director: "",
    //     category: "",
    //     language: "",
    //     status: "",
    //     cast: "",
    //     year_of_production: "",
    //     views_count: "",
    //     movie_trailer: "",
    // });

    useEffect(() =>
    {
        axios.get(`${MOVIE_DETAIL_URL}${id}`)
            .then(res => setMovie(res.data))
    }, [ignored, id])

    
    // function handle(e){
    //     const newdata = {...movie}
    //     newdata[e.target] = e.target.value
    //     setMovie(newdata)
    // } 
    
    const handleEditSave = () => {
        console.log('Using Update movie function')
        axiosInstance.put(`${MOVIE_DETAIL_URL}${id}/`,
            {
            title: movie.title,
            description: movie.description,
            image: movie.image,
            banner: movie.banner,
            director: movie.director,
            category: movie.category,
            language: movie.language,
            status: movie.status,
            cast: movie.cast,
            year_of_production: movie.year_of_production,
            views_count: movie.views_count,
            movie_trailer: movie.movie_trailer,
        }
        )
        .then(res => {
            if (res.status === 200) {
                toast("The movie Updated Successfuly", {
                    theme: "green",
                    icon: "✔️"
                })
                forceUpdate()
            }
            else {
                console.log(res.data)
            }
        })
        console.log("passing the data change ")
        setShow({showModal: false})

    }

    const handleEditOpen = () => {
        console.log('Open Edit Movie')
        setShow({showModal: true})
    }

    return (
    <div>
        <div>
            <Button startIcon={"✏️"} color="secondary" onClick={handleEditOpen}
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > *': {
                m: 1,
                },
            }}
            >
            Update  
            </Button>
        </div>
        <Modal show={show.showModal} 
            onHide={() => setShow({showModal: false})}>
            <Modal.Header closeButton>
                <Modal.Title>Update movie</Modal.Title>
            </Modal.Header>

            <ModalBody>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Text>
                            <Form.Control 
                                type="text" placeholder="Enter Movie's Title" 
                                value={movie.title}
                                // onChange={(e) => handle(e)}
                                onChange={(event) => setMovie({...movie, title: event.target.value})}
                                />
                        </Form.Text>
                    </Form.Group>
            
                    <Form.Group className="mb-3">
                        <Form.Label>Poster</Form.Label>
                        <Form.Text>
                            <Form.Control 
                                type="url" placeholder="Enter Movie's Poster" 
                                value={movie.image}
                                // onChange={(e) => handle(e)}
                                onChange={(event) => setMovie({...movie, image: event.target.value})}
                                />
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Banner</Form.Label>
                        <Form.Text>
                            <Form.Control 
                                type="url" placeholder="Enter Movie's Banner" 
                                value={movie.banner}
                                // onChange={(e) => handle(e)}
                                onChange={(event) => setMovie({...movie, banner: event.target.value})}
                                />
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Text>
                            <Form.Control 
                                type="text" placeholder="Enter Movie's description" 
                                value={movie.description}
                                // onChange={(e) => handle(e)}
                                onChange={(event) => setMovie({...movie, description: event.target.value})}
                                />
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select aria-label="Floating label select example" value={movie.category} 
                        // onChange={(e) => handle(e)}
                        onChange={(event) => setMovie({...movie, category: event.target.value})}
                        >
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
                        onChange={(event) => setMovie({...movie, language: event.target.value})}
                        // onChange={(e) => handle(e)}
                        >
                        <option value="english">English</option>
                        <option value="hebrew">Hebrew</option>
                        <option value="english">Spanish</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select aria-label="Floating label select example" value={movie.status} 
                        // onChange={(e) => handle(e)}
                        onChange={(event) => setMovie({...movie, status: event.target.value})} 
                        >
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
                                // onChange={(e) => handle(e)}
                                onChange={(event) => setMovie({...movie, cast: event.target.value})}
                                />
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Release Date</Form.Label>
                        <Form.Text>
                            <Form.Control 
                                type="date" placeholder="Enter Movie's release date" 
                                value={movie.year_of_production}
                                // onChange={(e) => handle(e)}
                                onChange={(event) => setMovie({...movie, year_of_production: event.target.value})}
                                />
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Trailer Link</Form.Label>
                        <Form.Text>
                            <Form.Control 
                                type="url" placeholder="Enter Trailer's URL" 
                                value={movie.movie_trailer}
                                // onChange={(e) => handle(e)}
                                onChange={(event) => setMovie({...movie, movie_trailer: (event.target.value)})}
                                />
                        </Form.Text>
                    </Form.Group>

                </Form>
            </ModalBody>
                <ModalFooter>
                    <Button onClick={handleEditSave}>Update</Button>
                </ModalFooter>
        </Modal>
    </div>
)
}

export default UpdateMovie