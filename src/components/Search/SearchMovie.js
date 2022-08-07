import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { MOVIES_URL, MOVIE_SEARCH_URL } from '../request_utils';
import { Form } from 'react-bootstrap'
import moment from 'moment';
// import GetRating from '../getRating'
import { Link } from "react-router-dom" ;
// import { VscDebugRestart } from "react-icons/vsc";
// import Stack from 'react-bootstrap/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function SearchMovie() {

    // const [value, setValue] = useState("");
    const [data, setData] = useState([])
    const [val, setVal] = useState("");

    useEffect(() => {
        loadMoviesData();
    }, [])

    const loadMoviesData = async () => {
        await axios.get(MOVIES_URL)
        .then((response) => setData(response.data.data))
        .catch((error) => console.log(error))
    }

    // const handleResetSearch = () => {
    //     loadMoviesData();
    // };

    const handleSearch = async (e) => {
        e.preventDefault();
        return await axios.get(`${MOVIE_SEARCH_URL}${val}`)
        .then((res) => {
            setData(res.data.data);
            setVal("");
        })
        .catch((err) => console.log(err));
    };

    const displayData = data.filter((movie) => {
        const searchTerm = val.toLowerCase()
        const fullName = movie.title.toLowerCase()

        return searchTerm && fullName.startsWith(searchTerm)
        })
        .map(filteredMovie => {
        const filteredMovie_url = `/details/${filteredMovie.id}`
        return(
                <div key={filteredMovie.id}>
                <Link to={filteredMovie_url} underline="none" onClick={() => setVal("")}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background'}} >
                    <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <img src={filteredMovie.image} alt={filteredMovie.slug + "image"} width={45} height={45}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={filteredMovie.title} secondary={moment(filteredMovie.year_of_production).format('MMMM Do YYYY')} />
                    </ListItem>
                </List>
                </Link>
                </div> 
        )
    })

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
        {/* <Autocomplete sx={{ width: 300 }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option.title)}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Search movie"
                InputProps={{
                ...params.InputProps,
                type: 'search',
                }}
                value={val}
                onChange={(event) => setVal(event.target.value)}
            />
        )}
        /> */}
            <TextField sx={{ width: 250 }}
            type="search"
            // className="form-control"
            label="Search movie"
            value={val}
            onChange={(event) => setVal(event.target.value)}
            />
            {/* <div>
                <Button startIcon={"🔍"}>
                </Button>
                <div className="vr" />
                <Button color="info" startIcon={<VscDebugRestart/>} onClick={() => handleResetSearch()}>
                </Button>
            </div> */}
            <hr></hr>
            <div className="data-wrapper">
                {displayData}
            </div>
        </Form>
        </div>
    )
}

export default SearchMovie