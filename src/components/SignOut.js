import React from 'react';
import axios from 'axios';
import {Nav, Container} from "react-bootstrap";
import {toast} from "react-toastify";
import {BASE_PATH} from "./request_utils";
import { HiLogout } from "react-icons/hi";

export class SignOut extends React.Component {
        constructor(props) {
        super(props)

        this.state = {
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
        handleSubmit() {
        const token = window.localStorage.getItem('token')
        if (token != null) {
            const headers = {Authorization: "Token " + token}
            window.localStorage.removeItem('token')
            console.log('Token Removed')
            axios.get(`${BASE_PATH}/signout`, {headers: headers})
            toast.success("Logged out succesfuly")
            this.props.handleUser({})
            this.props.handleLogin(false)
        }
        else{
            window.alert('You have not been signed in')
        }
        


        }
        render() {
    return(
            <>
                <Container>
                    <Nav.Item style={{marginLeft: 'auto'}}>
                    <Nav.Link style={{color:"whitesmoke"}} title="Log Out" onClick={this.handleSubmit}>
                        Log Out <HiLogout />
                    </Nav.Link>
                    </Nav.Item>
                </Container>
            </>
        )}
    }