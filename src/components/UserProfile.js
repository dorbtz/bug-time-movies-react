import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
// import FloatingLabel from 'react-bootstrap/FloatingLabel'
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {BASE_PATH} from "./request_utils";
import { AiTwotoneEdit } from "react-icons/ai";

export class UserProfile extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        user_profile: {},
        movies: [],
    }
}
componentDidMount() {
    const token = window.localStorage.getItem('token')
    axios
        .get(`${BASE_PATH}/movies`)
        .then(res =>this.setState({movies:res.data}))
    if (token) {
        axios.get(`${BASE_PATH}/user_profile/current`, {headers: {Authorization: 'Token ' + token}})
        .then(res => {
            if (res.status === 200) {
            console.log("got response for user " + res.data.user)
            this.setState({user_profile: res.data})
            }
            else if (res.status === 401) {
            console.log('401')
            }
        })
        .catch(error => {
            if (error.response.status === 401) {
              console.log("Need to go to login")
              this.setState({screen: "/login"})
            }
          })
        } else {
          console.log("Need to go to login")
          window.location.href = "/login"
    }
}

updateUserProfile(profile)
{
    const token = window.localStorage.getItem('token')
    if(token)
    {
        axios
    .put(`${BASE_PATH}/user_profile/current`, {profile},{headers: {Authorization: 'Token ' + token}})
    .then(res => this.setState({
        user_profile: res.data}
    )
    )
    }
    toast.success("Updated Successfuly", {
        theme: "colored",
        icon: "🚀"
    })
}
renderMovies(movies){
return(
    <option value={movies.id}>{movies.title}</option>
)
}

render() {
    let moviesObjects = this.state.movies.map(this.renderMovies)
    console.log(this.state)

    

    return(
        <Container>
            <h1 className={'the-title'}>User Profile</h1>
            <div style={{ width: "50%" }} className={"center"}>
                <Form.Group className="mb-3">
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={this.state.user_profile.city}
                            onChange={(event) => this.setState({ user_profile: { ...this.state.user_profile, city: event.target.value } })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={this.state.user_profile.address}
                            onChange={(event) => this.setState({ user_profile: { ...this.state.user_profile, address: event.target.value } })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
            
                        <Form.Label>Favorite Movie</Form.Label>
                        <Form.Select value={this.state.user_profile.favorite_movie}
                            onChange={(event) => this.setState({
                                user_profile: {
                                    ...this.state.user_profile,
                                    favorite_movie: event.target.value
                                }
                            })}>
                            <option>Pick favorite movie</option>
                            {moviesObjects}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Favorite Genre</Form.Label>
                            <Form value={this.state.user_profile.favorate_category} onChange={(event) => this.setState({category: event.target.value})}>
                              {['checkbox'].map((movies) => (
                                <div key={`inline-${movies.category}`} className="mb-3">
                                  <Form.Check
                                    inline
                                    label="Action"
                                    value="action"
                                    id={`inline-${movies.category}-1`}
                                  />
                                  <Form.Check
                                    inline
                                    label="Adventure"
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
                        {/* <Form.Select aria-label="Floating label select example" value={this.state.user_profile.favorite_category}
                            onChange={(event) => this.setState({
                                user_profile: {
                                    ...this.state.user_profile,
                                    favorite_category: event.target.value
                                }
                            })}>
                            <option value="Favorite Genre">Pick favorite genre</option>
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
                        </Form.Select> */}
                    </Form.Group>
                    <div className={"center"}>
                        <Button type="submit"
                            onClick={() => this.updateUserProfile(this.state.user_profile)}>
                            <AiTwotoneEdit />Update
                        </Button>
                    </div>
                </Form.Group>
            </div>
        </Container>
    )
}
}