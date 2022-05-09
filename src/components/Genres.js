import React from 'react'

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
        console.log(res.data)
        setMovies(res.data)}
        );
    }

    // const options = ["action", "adventure", "animated", "comedy", "crime", "drama", "fantasy", "horror", "historical", "romance", "western", "science-fiction"]

    const filterGenres = movies.filter(movie => movie.category).map(filteredMovie => {
        const filteredMovie_url = `/movies/${filteredMovie.category}`

        return(
                    <div className="card movie_card" key={filteredMovie.id}>
                        <img src={filteredMovie.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                        <Link to={filteredMovie_url}>            

                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                        </i>
                        </Link>
                        <h5 className="card-title">{filteredMovie.title}</h5>
                        <span className="movie_info">{moment(filteredMovie.year_of_production).format('YYYY/MM')}</span>
                        <GetRate id={filteredMovie.id} />
                        </div>
                    </div>
        )
    })

  return (
    <div>
        {filterGenres}
    </div>
  )
}

export default Genres