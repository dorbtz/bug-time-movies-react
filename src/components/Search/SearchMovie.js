import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import { MOVIES_URL, MOVIE_SEARCH_URL } from '../request_utils';
import { Form } from 'react-bootstrap'
import moment from 'moment';
import GetRating from '../getRating'
import { Link } from "react-router-dom" ;


function SearchMovie() {

    // const [value, setValue] = useState("");
    const [data, setData] = useState([])
    const [val, setVal] = useState("");

    useEffect(() => {
        loadMoviesData();
    }, [val])

    const loadMoviesData = async () => {
        await axios.get(MOVIES_URL)
        .then((response) => setData(response.data.data))
        .catch((error) => console.log(error))
    }

    const handleResetSearch = () => {
        loadMoviesData();
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        return await axios.get(`${MOVIE_SEARCH_URL}${val}`)
        .then((res) => {
            setData(res.data.data);
            setVal("");
        })
        .catch((err) => console.log(err));
    };

    // const onChange = (event) => {
    // setValue(event.target.value);
    // };

    // const onSearch = (searchTerm) => {
    // setValue(searchTerm);
    // // our api to fetch the search result
    // console.log("search ", searchTerm);
    // };

    // const moviesDisplay = data.map(filteredMovie => {
    //     const filteredMovie_url = `/details/${filteredMovie.id}`

    //     return(
    //                 <div className="card movie_card" key={filteredMovie.id}>
    //                     <img src={filteredMovie.image} className="card-img-top" alt={filteredMovie.slug + "-img"} />
    //                     <div className="card-body">
    //                     <Link to={filteredMovie_url}>            

    //                     <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="More Details">
    //                     </i>
    //                     </Link>
    //                     <h5 className="card-title">{filteredMovie.title}</h5><br></br>
    //                     <hr></hr>
    //                     <span className="movie_info">{moment(filteredMovie.year_of_production).format('YYYY/MM')}</span>
    //                     <GetRating key={filteredMovie.id} id={filteredMovie.id} />
    //                     </div>
    //                 </div>
    //     )
    // })

    return (
        <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{__html: "{font-family: 'Poppins', sans-serif}img {pointer-events: none;}.movie_card{padding: 0 !important;width: 20rem;margin:8px; border-radius: 10px;box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);}.movie_card img{border-top-left-radius: 10px;border-top-right-radius: 10px;height: 33rem;}.movie_info{color: #5e5c5c;}.movie_info i{font-size: 40px;}.card-title{width: 70%;height: 5rem;}.play_button{background-color: #ff3d49;   position: absolute;width: 60px;height: 60px;border-radius: 50%;right: 20px;bottom: 180px;font-size: 27px;padding-left: 21px;padding-top: 16px;color: #FFFFFF;cursor: pointer;}" }} />
        
        <Form style={{
            margin: "auto", 
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
        >
            <input 
            type="text"
            className="form-control"
            placeholder="Search movie..."
            value={val}
            onChange={(event) => setVal(event.target.value)}
            />
            <ButtonGroup>
                <Button type="submit" color="success">
                    Search
                </Button>
                <Button type="mx-2" color="info" onClick={() => handleResetSearch()}>

                </Button>
            </ButtonGroup>
        </Form>

            {/* {moviesDisplay} */}
            <div className="container">
                <div key={data.id}>
                    title = {data.title}
                    

                </div>
            </div>
        </div>
    )
}

export default SearchMovie