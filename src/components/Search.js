import React, {useState, useEffect} from 'react'

const Search = () => {

    const search = 'search';
    const [appState, setAppState] = useState({
        search: '',
        movies: [],
    });

    useEffect(() => {
        axios.get(search + '/' + window.location.search).then((res) => {
            const allMovies = res.data;
            setAppState({movies: allMovies});
            console.log(res.data);
        });
    }, [setAppState])

    return (
        <div>
            Search
        </div>
    )
}

export default Search