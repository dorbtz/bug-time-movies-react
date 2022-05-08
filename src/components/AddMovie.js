import React from 'react';
import axios from 'axios';
// import CardGroup from 'react-bootstrap/CardGroup'
import { Button, Form, Modal, ModalBody, ModalFooter, FormControl, Container } from 'react-bootstrap';
// import {GENRES_URL} from './request_utils'
import {ADD_MOVIES_URL, MOVIES_URL} from './request_utils'
import {toast} from 'react-toastify'
import {FaCheckCircle} from 'react-icons/fa'
import {HiDocumentAdd} from 'react-icons/hi'
import { getHeader } from './request_utils';


export class AddMovie extends React.Component {
  
  state = {
    movies: [],
    cast: [],
    showModal: false,
    showDetails: false,
    title: "",
    description: "",
    image: "",
    director: "",
    category: "",
    language: "",
    status: "",
    year_of_production: "",
    views_count: 0,
    movie_trailer: "",
    slug: "",
    searchTerm: "",
    totalResaults: 0,
    currentPage: 1,
  };
  
  async componentDidMount() {


    let data;
    axios.get(MOVIES_URL)
    .then(res => {
      data = res.data;
      this.setState({movies: data});
    }).catch(err => { })
    

  }

    handleAddNew() {
    console.log('called handleAddNew')
    this.setState({showModal: true})
  }

  handleDetails() {
    console.log('called handleDetails')
    this.setState({showDetails: true})
  }

  handleHideDetails() {
    console.log('Called handleDetails')
    this.setState({showDetails: false})
  }

  handleSaveNew() {
    console.log('called handleSaveNew')
    axios.post(
        ADD_MOVIES_URL, 
        {title: this.state.title,
          description: this.state.description,
          image: this.state.image,
          director: this.state.director,
          category: this.state.category,
          language: this.state.language,
          status: this.state.status,
          // cast: this.state.cast,
          year_of_production: this.state.year_of_production,
          views_count: this.state.views_count,
          movie_trailer: this.state.movie_trailer,
          slug: this.state.slug,
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
        theme: "color",
        icon: <FaCheckCircle />
    });
  }

  nextPage = (pageNumber) => {
    
  }

  render() {
    
    return(
      <div>
      <div>
        <Container>
          <h1 className="m-3">
            <span>
              <Form className="d-flex">
                  <FormControl
                  type="search"
                  placeholder="Search for a movie"
                  className="me-3"
                  aria-label="Search"
                  onChange={(event) => this.setState({search: event.target.value})}
                  value={this.state.search}
                  />
                  <Button fixed="end" variant="outline-info">Search</Button>
              </Form>
            </span>
            <span>
                <Button className="m-3" onClick={this.handleAddNew.bind(this)}>
                    Add Movie <HiDocumentAdd />
                </Button>
            </span>
          </h1>
        </Container>
      </div>
      <div>
        <Container>
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
                                        value={this.state.title}
                                        onChange={(event) => this.setState({title: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>
                    
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Image/Poster</Form.Label>
                                <Form.Control type="file" 
                                value={this.state.Image} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Director</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's Director(s)" 
                                        value={this.state.director}
                                        onChange={(event) => this.setState({director: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            {/* <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Banner</Form.Label>
                                <Form.Control type="file" size='sm'
                                value={this.state.movies.Banner}/>
                            </Form.Group> */}

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Text>
                                    <Form.Control as="textarea"
                                        type="text" placeholder="Enter Movie's description" 
                                        value={this.state.description}
                                        onChange={(event) => this.setState({description: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form value={this.state.category} onChange={(event) => this.setState({category: event.target.value})}>
                              {['checkbox'].map((movies) => (
                                <div key={`inline-${movies.id}`} className="mb-3">
                                  <Form.Check
                                    inline
                                    label="ACTION"
                                    value="action"
                                    id={`inline-${movies.category}-1`}
                                  />
                                  <Form.Check
                                    inline
                                    label="ADVENTURE"
                                    value='adventure'
                                    id={`inline-${movies.category}-2`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Animated"
                                    value="animated"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Comedy"
                                    value="comedy"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Crime"
                                    value="crime"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Drama"
                                    value="drama"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Fantasy"
                                    value="fantasy"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Horror"
                                    value="horror"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Historical"
                                    value="historical"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Romance"
                                    value="romance"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Western"
                                    value="western"
                                    id={`inline-${movies.category}-3`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Science-fiction"
                                    value="science-fiction"
                                    id={`inline-${movies.category}-3`}
                                  />
                                </div>
                              ))}
                            </Form>

                            <Form.Group className="mb-3">
                                <Form.Label>Language</Form.Label>
                                <Form.Select aria-label="Floating label select example" value={this.state.language} 
                                onChange={(event) => this.setState({language: event.target.value})}>
                                  <option value="english">English</option>
                                  <option value="hebrew">Hebrew</option>
                                  <option value="english">Spanish</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Floating label select example" value={this.state.status} 
                                onChange={(event) => this.setState({status: event.target.value})} >
                                  <option value="recently-added">Recently added</option>
                                  <option value="top-rated">Top rated</option>
                                  <option value="most-watched">Most watched</option>
                                </Form.Select>
                            </Form.Group>

                              {/* <Form.Group className="mb-3">
                                  <Form.Label>Cast</Form.Label>
                                  <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's cast" 
                                        value={this.state.cast}
                                        onChange={(event) => this.setState({cast: event.target.value})}/>
                                  </Form.Text>
                              </Form.Group> */}


                            <Form.Group className="mb-3">
                                <Form.Label>Release Date</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="date" placeholder="Enter Movie's release date" 
                                        value={this.state.year_of_production}
                                        onChange={(event) => this.setState({year_of_production: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Trailer Link</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="url" placeholder="Enter Trailer's URL" 
                                        value={this.state.movie_trailer}
                                        onChange={(event) => this.setState({movie_trailer: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSaveNew.bind(this)}>Save</Button>
                    </ModalFooter>
                </Modal>
        </Container>
      </div>
      </div>
    )
  }
}