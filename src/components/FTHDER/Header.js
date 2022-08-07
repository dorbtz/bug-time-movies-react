import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import { Container, NavDropdown, Nav, DropdownButton } from 'react-bootstrap';
import movielogo from '../../movielogo.png'
import { HiOutlineLogout, HiHome, HiFilm, HiOutlineLogin } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import {toast} from "react-toastify";
import {BASE_PATH, TOKEN, CURRENT_USER } from "../request_utils";
import { GiArchiveRegister } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import SearchMovie from "../Search/SearchMovie";

export class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      first_name: "",
      last_name: "",
      movies: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    if (token) {
      axios.get(CURRENT_USER, {headers: {Authorization: 'Token ' + token}})
      .then(response => {
        if (response.status === 200) {
          this.setState({first_name: response.data.first_name, last_name: response.data.last_name})
        }
        else if (response.status === 401) {
          console.log('401')
        }
      })
    }
  }

  handleSubmit() {
    const token = window.localStorage.getItem('token')
    if (token != null) {
        const headers = {Authorization: "Token " + token}
        window.localStorage.removeItem('token')
        console.log('Token Removed')
        axios.get(`${BASE_PATH}/signout`, {headers: headers})
        toast.success("Logged out succesfuly")
        window.location.href="/"
    }
    else{
        window.alert('You have not been signed in')
    }
    
    }

    handleLogin(event) {
      event.preventDefault()
      axios.post(TOKEN, {
          username: this.state.username,
          password: this.state.password
      })
      .then(result => {
          window.localStorage.setItem("Token", result.data.token)
          this.props.navigate('/')
      })
      .catch(error => window.alert(error))
      
  }

  render() {
      return(
      <Navbar >
        <Container>
          <Navbar.Brand href="/">
          <img
            alt="logo"
            src={movielogo}
            // src='./media/logo/movielogo.png'
            width="100%"
            height="100%"
            className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="responsive-navbar-nav" sm="lg">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/"> <HiHome /> Home</Nav.Link>
              <NavDropdown title="Movies" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/movies"><HiFilm />  All Movies</NavDropdown.Item>
                <NavDropdown.Divider />
                <DropdownButton
                  // as={ButtonGroup}
                  key="genres-end"
                  id={`dropdown-button-drop-end`}
                  drop="end"
                  variant="outline"
                  title={<><BiCategory /> Genres</>}
                >
                  <NavDropdown.Item href="/movies/action">Action</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/adventure">Adventure</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/animated">Animated</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/comedy">Comedy</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/crime">Crime</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/drama">Drama</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/fantasy">Fantasy</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/horror">Horror</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/historical">Historical</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/romance">Romance</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/western">Western</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/science-fiction">Science-fiction</NavDropdown.Item>
                </DropdownButton>
                <NavDropdown.Divider />
              {/* </NavDropdown> */}
                {/* <DropdownButton
                  // as={ButtonGroup}
                  key="year-end"
                  id={`dropdown-button-drop-end`}
                  drop="end"
                  variant="outline"
                  title={<><IoCalendarNumberOutline/> Years</>}
                >
                  <NavDropdown.Item href="/movies/year/2022">2022</NavDropdown.Item>
                </DropdownButton>
                <NavDropdown.Divider /> */}
                <DropdownButton
                  // as={ButtonGroup}
                  key="lang-end"
                  id={`dropdown-button-drop-end`}
                  drop="end"
                  variant="outline"
                  title={<><MdLanguage/> Languages</>}
                >
                  <NavDropdown.Item href="/movies/en">English</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/he">Hebrew</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/es">Español</NavDropdown.Item>
                </DropdownButton>
              </NavDropdown>
            </Nav>
            {/* "// SEARCH BAR HERE" */}
            <SearchMovie  />
            {/* <SearchBar 
              value={data.search}
              onChange={(newValue) => setData({ search: newValue })}
              onRequestSearch={() => goSearch(data.search)}
            /> */}
            {/* {SearchBar} */}
            {window.localStorage.getItem(["token"]) ?
            <Navbar.Collapse className="justify-content">
              <Navbar.Text style={{marginLeft: 'auto'}}>
              Welcome: {this.state.first_name + ' ' + this.state.last_name} 😄
              </Navbar.Text>

              <NavDropdown title="Profile" id="navbarScrollingDropdown">
                  <NavDropdown.Item href='/users/profile' style={{marginLeft: 'auto'}}> <FaUser /> My Profile </NavDropdown.Item>
                  <NavDropdown.Item style={{marginLeft: 'auto'}} />
                    
                  <NavDropdown.Item title="Logout" onClick={this.handleSubmit}>
                  <HiOutlineLogout /> Logout
                  </NavDropdown.Item>
                  
              </NavDropdown>
            </Navbar.Collapse>
            :
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Nav.Link title="Login" href="/login">
              Login <HiOutlineLogin />
              </Nav.Link>
            
              <Nav.Link title="Signup" href="/signup">
                Signup <GiArchiveRegister/>
              </Nav.Link>
            </div>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )
  }
}