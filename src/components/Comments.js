import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
// import FloatingLabel from 'react-bootstrap/FloatingLabel'
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import { MOVIES_URL, USER_PROFILE, COMMENTS_URL, RATINGS_URL } from "./request_utils";
import { AiTwotoneEdit } from "react-icons/ai";
import {Header} from './Header';
import Footer from "./Footer";

export class Comments extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        user_profile: {},
        movies: [],
        comments: [],
    }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token')
        if (token)
        {
            axios
                .get(USER_PROFILE, {headers: {Authorization: 'Token ' + token}})
                .then(res =>
                    (axios
                        .get(MOVIES_URL + res.data.movie)
                        .then(res => this.setState({
                            movie: res.data})), // eslint-disable-next-line
                    (axios
                        .get(COMMENTS_URL + res.data.comment)
                        .then(res => this.setState({
                            comments: res.data
                        }))
                        )))
        }
}   
}