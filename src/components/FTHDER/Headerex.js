import "bootstrap/dist/css/bootstrap.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axios";

const Headerex = (props) => {
    const [query, setQuery] = useState(props)
    const [movies, setMovies] = useState([])
    const history = useNavigate();
    
    const handleSearchChange = (e) => {
    const newValue = e.target.value;
    props.setSearchText((oldValue) => newValue);
    console.log(` newValue ${newValue}`);
    };

    useEffect(() => {
        axiosInstance
            .get(`/movies/`)
            .then((res) => setMovies(res.data))
        // console.log(data)

    }, [])

    const onSearchSubmit = (e) => {
        e.preventDefault();
        console.log(props.searchText.trim().length);
        const searchText = props.searchText.trim();
        if (searchText.length > 0) {
        console.log("im here");
        props.setCategoryFilter("");
        props.setTriggerSearch((oldValue) => !oldValue);
        history("store");
        } else if (searchText.length === 0) {
        props.setSearchText("");
        props.setCategoryFilter("");
        history("store");

      // props.setTriggerSearch((oldValue) => !oldValue);
    }
    };

    const handleCategoryFilter = (e) => {
        console.log(e.target.name);
        console.log("i reached here");
        props.setCategoryFilter(e.target.name);
        props.setPage(1);
        history("store");
    };

    const [catLinks, setCatLinks] = useState([]);
    useEffect(() => {
        axiosInstance.get(`movies`).then((res) => setCatLinks(res.data.data));
    }, []);

    const navCategories = catLinks.map((cat) => {
        return (
        <NavDropdown.Item
            name={cat.category}
            key={cat.id}
            onClick={handleCategoryFilter}>
            {cat.category}
        </NavDropdown.Item>
        );
    });

    return (
        <div>
        <Navbar sticky='top' expand='sm' collapseOnSelect variant='#0D6EFD'>
            <Navbar.Toggle className='coloring' />
            <Navbar.Collapse>
            <Form className='d-flex' style={{ alignItems: "center" }}>
                <FormControl
                placeholder='Search'
                className='me-2'
                aria-label='Search'
                type='text'
                name='keyword'
                value={props.searchText}
                onChange={handleSearchChange}
                />
                <Button
                className='btn btn-primary'
                onClick={onSearchSubmit}
                type='submit'>
                Search
                </Button>
            </Form>
            </Navbar.Collapse>
        </Navbar>
        </div>
    );
};

export default Headerex;