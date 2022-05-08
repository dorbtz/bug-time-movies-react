import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import { Container, NavDropdown, Nav, DropdownButton } from 'react-bootstrap';
// import movielogo from '../img/logo/movielogo.png'
import { HiOutlineLogout, HiHome, HiFilm, HiOutlineLogin } from "react-icons/hi";
import { FaUser, FaRegSmileWink} from "react-icons/fa";
import {toast} from "react-toastify";
import {BASE_PATH, TOKEN, CURRENT_USER } from "../request_utils";
import { GiArchiveRegister } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import {SearchBar} from '../SearchBar';
import { BiCategory } from "react-icons/bi";

export class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      first_name: "",
      last_name: "",
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
          console.log(result)
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
            // src={movielogo}
            src='./media/logo/movielogo.png'
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
                  title={<h7><BiCategory /> Genres</h7>}
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
                <DropdownButton
                  // as={ButtonGroup}
                  key="year-end"
                  id={`dropdown-button-drop-end`}
                  drop="end"
                  variant="outline"
                  title={<h7><IoCalendarNumberOutline/> Years</h7>}
                >
                  <NavDropdown.Item href="/movies/year/2022">2022</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2021">2021</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2020">2020</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2019">2019</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2018">2018</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2017">2017</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2016">2016</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2015">2015</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2014">2014</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2013">2013</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2012">2012</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/year/2011">2011</NavDropdown.Item>
                </DropdownButton>
                <NavDropdown.Divider />
                <DropdownButton
                  // as={ButtonGroup}
                  key="lang-end"
                  id={`dropdown-button-drop-end`}
                  drop="end"
                  variant="outline"
                  title={<h7><MdLanguage/> Languages</h7>}
                >
                  <NavDropdown.Item href="/movies/language/en">English</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/language/he">Hebrew</NavDropdown.Item>
                  <NavDropdown.Item href="/movies/language/es">Español</NavDropdown.Item>
                </DropdownButton>
              </NavDropdown>
            </Nav>
            {/* "// SEARCH BAR HERE" */}
            {/* {SearchBar} */}
            {window.localStorage.getItem(["token"]) ?
            <Navbar.Collapse className="justify-content">
              <Navbar.Text style={{marginLeft: 'auto'}}>
              Welcome <FaRegSmileWink />: {this.state.first_name + ' ' + this.state.last_name}
              </Navbar.Text>

              <NavDropdown title="Profile" id="navbarScrollingDropdown">
                  <NavDropdown.Item href='/users/profile' style={{marginLeft: 'auto'}}> <FaUser /> My Profile </NavDropdown.Item>
                  <NavDropdown.Item style={{marginLeft: 'auto'}} />
                    {/* {window.localStorage.getItem(["token"]) ? */}
                    
                  <NavDropdown.Item title="Logout" onClick={this.handleSubmit}>
                    Logout <HiOutlineLogout />
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