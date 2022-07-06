// ** create-user.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
import {USER_REGISTRATION} from './request_utils'
import {toast} from 'react-toastify'
import {FaCheckCircle} from 'react-icons/fa'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

export class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserFirstName = this.onChangeUserFirstName.bind(this);
        this.onChangeUserLastName = this.onChangeUserLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
        }
    }
    onChangeUserName(e) {
        this.setState({ username: e.target.value })
    }
    onChangeUserPassword(e) {
        this.setState({ password: e.target.value })
    }
    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }
    onChangeUserFirstName(e) {
        this.setState({ first_name: e.target.value })
    }
    onChangeUserLastName(e) {
        this.setState({ last_name: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const userObject = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
        };
        axios.post(USER_REGISTRATION, userObject)
            .then((res) => {
                console.log(res.data.data)
            }).catch((error) => {
                console.log(error)
            });
            this.setState({ username: '', password: '', email: '' , first_name: '', last_name: ''})
            toast.success("User created successfuly", {
                theme: "green",
                icon: <FaCheckCircle />
            })
            .then(window.location.href="/users/profile")
    }

    render() {
        return (
            <div className="wrapper" component="form" noValidate sx={{ mt: 3 }}>
                <form onSubmit={this.onSubmit} spacing={2}>
                    <div className="form-group" xs={12} sm={6}>
                        <label>Username</label>
                        <input autoFocus id="username" autoComplete="username" name="username" label="Username" type="text" value={this.state.username} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Choose Password</label>
                        <input autoFocus id="password" autoComplete="password" name="password" label="Password" type="password" value={this.state.password} onChange={this.onChangeUserPassword} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input autoFocus id="email" autoComplete="email" name="email" label="Email Addresss" type="email" value={this.state.email} onChange={this.onChangeUserEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input autoFocus id="first_name" autoComplete="first_name" name="first_name" label="First_name" type="text" value={this.state.first_name} onChange={this.onChangeUserFirstName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input autoFocus id="last_name" autoComplete="last_name" name="last_name" label="Last_name" type="text" value={this.state.last_name} onChange={this.onChangeUserLastName} className="form-control" />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                    <hr></hr>
                    <Grid container justifyContent="center">
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in!
                        </Link>
                    </Grid>
                </form>
            </div>
        )
    }
}