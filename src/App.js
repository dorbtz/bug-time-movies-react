import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
// import Home from './components/Home';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

// import { Movies } from './components/Movies'
// import MovieList from './components/MovieList'
import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { WrappedLoginScreen } from './components/LoginScreen'
// import {SignUp} from './components/SignUp'
import {CreateUser} from './components/CreateUser'
import {UserProfile} from './components/UserProfile'
// import { SignInSide } from "./components/SignInSide";
// import {UserProfile} from "react-userprofile";
import {SignOut} from "./components/SignOut";
import Homepage from "./components/Homepage";
// import {SignUpItamar} from "./components/ItamarSignUp";
import {Header} from "./components/FTHDER/Header";
import Copyright from "./components/FTHDER/Footer";
// import {TestProf} from './components/testprof'
import MovieDetails from "./components/MovieDetails";
// import MovieCard from "./components/Moviecard";
// import YoutubeEmbed from "./components/Youtube";
// import SearchBar from "./components/SearchBar";
// import Paginate from "./components/Pagination/Paginate";
import { AddMovie } from "./components/AddMovie";
// import AddMovie from "./components/movies/AddMovie";
// import NewHome from "./components/NewHome";
// import Genres from "./components/Genres";
import ListMovies from "./components/ListMovies";
import {Action} from "./components/Genres/Action"
import {Adventure} from "./components/Genres/Adventure";
import {Animated} from "./components/Genres/Animated";
import {Crime} from "./components/Genres/Crime";
import {Comedy} from "./components/Genres/Comedy";
import {Drama} from "./components/Genres/Drama";
import {Fantasy} from "./components/Genres/Fantasy";
import {Historical} from "./components/Genres/Historical";
import {Horror} from "./components/Genres/Horror";
import {Romance} from "./components/Genres/Romance";
import {ScienceFiction} from "./components/Genres/Science-fiction";
import {Western} from "./components/Genres/Western";
import { Hebrew } from "./components/Languages/Hebrew";
import { Espanol } from "./components/Languages/Espanol";
import {English } from "./components/Languages/English";


class App extends React.Component {

  render() {
    return(
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <div className="App">
          {/* <h1>Hi</h1> */}
          
          <Container>
            <Header />
            <hr></hr>
          </Container>
          <Container>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/movies" element={<ListMovies />} />
              <Route path="/login" element={<WrappedLoginScreen />} />
              <Route path="/logout" element={<SignOut />} />
              <Route path="/users/profile" element={<UserProfile />} />
              <Route path="/signup" element={<CreateUser />} />
              <Route path="/details/:id" element={<MovieDetails />} />
              <Route path="/add" element={<AddMovie />} />
              <Route path="/movies/action" element={<Action />} />
              <Route path="/movies/adventure" element={<Adventure />} />
              <Route path="/movies/animated" element={<Animated />} />
              <Route path="/movies/comedy" element={<Comedy />} />
              <Route path="/movies/crime" element={<Crime />} />
              <Route path="/movies/drama" element={<Drama />} />
              <Route path="/movies/fantasy" element={<Fantasy />} />
              <Route path="/movies/historical" element={<Historical />} />
              <Route path="/movies/horror" element={<Horror />} />
              <Route path="/movies/romance" element={<Romance />} />
              <Route path="/movies/science-fiction" element={<ScienceFiction />} />
              <Route path="/movies/western" element={<Western />} />

              /language routes
              <Route path="/movies/en" element={<English />} />
              <Route path="/movies/he" element={<Hebrew />} />
              <Route path="/movies/es" element={<Espanol />} />
            </Routes>
          </Container>
          <Copyright sx={{ mt: 5 }} />
          <br></br>
        </div>
      </ThemeProvider>

    )
  }

}


export default App;
