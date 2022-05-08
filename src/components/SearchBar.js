import React, {useState, useEffect} from 'react';
import {Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios'
import {MOVIES_URL} from './request_utils'
// const [inputText, setInputText] = useState("");
// let inputHandler = (e) => {
//     //convert input text to lower case
//     var lowerCase = e.target.value.toLowerCase();
//     setInputText(lowerCase);

//     return (
//         <div className="main">
//         <h1>React Search</h1>
//         <div className="search">
//             <TextField
//             id="outlined-basic"
//             onChange={inputHandler}
//             variant="outlined"
//             fullWidth
//             label="Search"
//             />
//         </div>
//         <MovieList input={inputText} />
//         </div>
//     );

// export default function SearchMovies(){

//     const searchMovies = async (e) => {
//         e.preventDefault();

//         const query = {inputText};

//         const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;

//         try {
//             const res = await fetch(url);
//             const data  = await res.json();
//             console.log(data);
//         }catch(err){
//             console.error(err);
//         }
//     }
// }



const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");

    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = () => {
        axios.get(MOVIES_URL).then((res) => 
        {
        console.log(res.data)
        setMovies(res.data)}
        );
    }

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    if (searchInput.length > 0) {
        movies.filter((movie) => {
        return movie.title.match(searchInput);
    });
    }
    
    const searchDisplay = movies.map(movie => {
        console.log(movie.title)

        return(
            <div>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search for a movie"
                    className="me-3"
                    aria-label="Search"
                    onChange={handleChange}
                    value={searchInput}
                    />
                    <Button fixed="end" variant="outline-info">Search</Button>
                </Form>
                <table>
                    <tr>
                        <th>Movies</th>
                        <th>Continent</th>
                    </tr>
                    {movies.map(movie => (
                    <div>
                    <tr>
                        <td>{movie.title}</td>
                        <td>{movie.category}</td>
                    </tr>
                    </div>
                    ))}
                </table>
            </div>
        )
    })

        return (
            <div>
                {searchDisplay}
            </div>
        )
    }

export default SearchBar