import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {MOVIES_URL} from './request_utils';
import GetRate from './getRate';
import { Link } from "react-router-dom" ;
import moment from "moment";


const Genres = ({ genre }) => {

    const [movies, setMovies] = useState([])
    // const getMovies = async () => {
    //     const params = {page: 1}
    //     try {
    //         const response = await  
    //     }
    // }

    useEffect(() => {
        getData();
    }, [])
    
    const getData = () => {
        axios.get(MOVIES_URL).then((res) => 
        {
        console.log(res.data.data)
        setMovies(res.data.data)}
        );
    }

    const options = ["action", "adventure", "animated", "comedy", "crime", "drama", "fantasy", "horror", "historical", "romance", "western", "science-fiction"]

    const filterGenre = movies.filter(movie => movie.category === {option}).map(filteredGenre => {
        const filteredGenre_url = `/movies/${filteredGenre.category}`
        return(
                    <div className="card movie_card" key={filteredGenre.id}>
                        <img src={filteredGenre.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <Link to={filteredGenre_url}>            

                            <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                            </i>
                            </Link>
                            <h5 className="card-title">{filteredGenre.title}</h5>
                            <span className="movie_info">{moment(filteredGenre.year_of_production).format('YYYY/MM')}</span>
                            <GetRate id={filteredGenre.id} />
                        </div>
                    </div>                
        )
    })

return (
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{__html: "{font-family: 'Poppins', sans-serif; }.movie_card{width: 12rem; margin:5px; border-radius: 5px; box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 15px 0 rgba(0, 0, 0, 0.19);}.movie_card img{border-top-left-radius: 10px;border-top-right-radius: 10px;height: 14rem;}.movie_info{color: #5e5c5c; }.movie_info i{font-size: 25px;}.card-title{width: 80%;height: 4rem;}.play_button{background-color: #ff3d49;   position: absolute;width: 60px;height: 60px;border-radius: 50%;right: 20px;bottom: 111px;font-size: 27px;padding-left: 21px;padding-top: 16px;color: #FFFFFF;cursor: pointer;}" }} />

        {filterGenre = option}
    </div>
)
}

export default Genres