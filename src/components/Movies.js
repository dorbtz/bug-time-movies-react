import axios from 'axios';
import React from 'react';
import { Button, Form, ListGroup, Modal, ModalBody, ModalFooter, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {getHeader, MOVIES_URL, ADD_MOVIES_URL} from '../components/request_utils'
import { HiDocumentAdd } from 'react-icons/hi';
import { toast } from 'react-toastify';
import {FaCheckCircle} from 'react-icons/fa';

export class Movies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            showModal: false,
            title: "",
            description: "",
            image: null,
            banner: null,
            category: "",
            language: "",
            // status: "",
            cast: "",
            year_of_production: "",
            views_count: "",
            movie_trailer: "",
            showImportModal: false,
        }

        this.deleteMovie = this.deleteMovie.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    get_movies() {
        console.log('called get_movies')
        axios.get(MOVIES_URL, getHeader())
        .then(response => {
            console.log(response)
            this.setState({movies: response.data})
        })
    }

    componentDidMount() {
        this.get_movies()
    }

    handleAddNew() {
        console.log('called handleAddNew')
        this.setState({showModal: true})
    }

    handleSaveNew() {
        console.log('called handleSaveNew')
        axios.post(
            ADD_MOVIES_URL, 
            {title: this.state.movies.title,
                description: this.movies.description,
                image: this.movies.image,
                banner: this.movies.banner,
                category: this.movies.category,
                language: this.movies.language,
                status: this.movies.status,
                cast: this.movies.cast,
                year_of_production: this.movies.year_of_production,
                views_count: this.movies.views_count,
                movie_trailer: this.movies.movie_trailer,
            }, 
            getHeader()
        )
        .then(response => {
            if (response.status === 201) {
                this.get_movies()
            }
        })
        this.setState({showModal: false})
        toast("Updated Successfuly", {
            theme: "green",
            icon: <FaCheckCircle />
        })
    }

    deleteMovie(movieId) {
        axios.delete(
            `${MOVIES_URL}/${movieId}/delete`, 
            getHeader()
        ).then(response => {
            if (response.status === 200) {
                this.get_movies()
            }
        })

    }

    handleChange(event) {
        this.setState({
            image: URL.createObjectURL(event.target.image[0])
        })
    }
//


    render() {

        const movies = this.state.movies.map(
            movie => { return(
                <ListGroup.Item key={movie.id}>
                    {movie.image}, {movie.title}, {movie.description} 
                    <Button onClick={() => this.deleteMovie(movie.id)}>Delete</Button>
                </ListGroup.Item>
            )}
        )
        return(
            <>
                    <div>
                        <Card>
                            <Card.Img variant="top" src={this.state.movies.image} />
                            <Card.Body>
                                <Card.Title>{this.state.movies.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{this.state.movies.status}</Card.Subtitle>
                                <Card.Text>
                                {this.state.movies.description}
                                </Card.Text>
                                <Button variant="primary">More Details</Button> {' '}
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{this.state.movies.created}</small>
                            </Card.Footer>
                        </Card>
                    </div>
                <Container>
                    <h1 className="m-3"> 
                        <span>
                            <Button className="m-3" onClick={this.handleAddNew.bind(this)}>
                                Add Movie <HiDocumentAdd />
                            </Button>
                        </span>
                    </h1>

                    <ListGroup>
                        {movies}
                    </ListGroup>
                </Container>

                <Modal show={this.state.showModal} 
                    onHide={() => this.setState({showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new movie</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's Title" 
                                        value={this.state.movies.title}
                                        onChange={(event) => this.setState({title: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>
                    
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Image/Poster</Form.Label>
                                <Form.Control type="file" 
                                value={this.state.movies.Image} />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Banner</Form.Label>
                                <Form.Control type="file" size='sm'
                                value={this.state.movies.Banner}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's description" 
                                        value={this.state.movies.description}
                                        onChange={(event) => this.setState({description: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select aria-label="Floating label select example">
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
                                <Form.Text>
                                    <Form.Control 
                                        type="choice" placeholder="Enter Movie's language" 
                                        value={this.state.movies.language}
                                        onChange={(event) => this.setState({language: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's status" 
                                        value={this.state.movies.status}
                                        onChange={(event) => this.setState({status: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cast</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's cast" 
                                        value={this.state.movies.cast}
                                        onChange={(event) => this.setState({cast: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Release Date</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="date" placeholder="Enter Movie's release date" 
                                        value={this.state.movies.year_of_production}
                                        onChange={(event) => this.setState({year_of_production: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSaveNew.bind(this)}>Save</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}