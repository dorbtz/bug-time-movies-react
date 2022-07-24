import React from 'react';
import axios from 'axios';
// import CardGroup from 'react-bootstrap/CardGroup'
import { Button, Form, Modal, ModalBody, ModalFooter, Container } from 'react-bootstrap';
// import {GENRES_URL} from './request_utils'
import {ADD_MOVIES_URL, MOVIES_URL} from './request_utils'
import {toast} from 'react-toastify'
import {FaCheckCircle} from 'react-icons/fa'
import {HiDocumentAdd} from 'react-icons/hi'
import { getHeader } from './request_utils';


export class AddMovie extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      cast: "",
      showModal: false,
      showDetails: false,
      title: "",
      description: "",
      image: "",
      banner: "",
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
    this.handleSaveNew= this.handleSaveNew.bind(this)
  }
    
  
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
          banner: this.state.banner,
          director: this.state.director,
          category: this.state.category,
          language: this.state.language,
          status: this.state.status,
          cast: this.state.cast,
          year_of_production: this.state.year_of_production,
          views_count: this.state.views_count,
          movie_trailer: this.state.movie_trailer,
          slug: this.state.slug,
        },
        getHeader()
    )
    .then(response => {
        if (response.status === 201) {
          this.setState({showModal: false})
          toast(`${this.state.title} added successfuly`, {
              theme: "color",
              icon: <FaCheckCircle />
          });
        }
    })
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
                    
                            <Form.Group className="mb-3">
                                <Form.Label>Poster</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="url" placeholder="Enter Movie's Poster" 
                                        value={this.state.image}
                                        onChange={(event) => this.setState({image: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Banner</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="url" placeholder="Enter Movie's Banner" 
                                        value={this.state.banner}
                                        onChange={(event) => this.setState({banner: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            {/* <Form.Group controlId="formFile" className="mb-2">
                                <Form.Label>Image/Poster</Form.Label>
                                <Form.Control type="file"
                                  name="file"
                                  value={this.state.image} onChange={(event) => this.setState({image: event.target.value})}
                                  />
                            </Form.Group> */}

                            <Form.Group className="mb-3">
                                <Form.Label>Director</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's Director(s)" 
                                        value={this.state.director}
                                        onChange={(event) => this.setState({director: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cast</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter Movie's cast(s)" 
                                        value={this.state.cast}
                                        onChange={(event) => this.setState({cast: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Text>
                                    <Form.Control as="textarea"
                                        type="text" placeholder="Enter Movie's description" 
                                        value={this.state.description}
                                        onChange={(event) => this.setState({description: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select aria-label="Floating label select example" value={this.state.category} onChange={(event) => this.setState({category: event.target.value})}>
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
                                <Form.Select aria-label="Language" value={this.state.language} 
                                  onChange={(event) => this.setState({language: event.target.value})}>
                                  <option value="english">ENGLISH</option>
                                  <option value="hebrew">HEBREW</option>
                                  <option value="spanish">SPANISH</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Status" value={this.state.status} 
                                  onChange={(event) => this.setState({status: event.target.value})}>
                                  <option value="recently-added">RECENTLY ADDED</option>
                                  <option value="most-watched">MOST WATCHED</option>
                                  <option value="top-rated">TOP RATED</option>
                                </Form.Select>
                            </Form.Group>


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