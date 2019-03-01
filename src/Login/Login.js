import React, { Component } from "react";
import Link from "react-router-dom";
import fire from "../config/Fire";

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
            let alert = document.getElementById("alert-danger");
            alert.classList.remove('d-none');
            alert.innerHTML = error.message;
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            console.log(error);
            let alert = document.getElementById("alert-danger");
            alert.classList.remove('d-none');
            alert.innerHTML = error.message;
        });
    }



    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="mt-5">
                    <img src="img/soffpotatis.png" className="w-25 mx-auto d-block" alt="CouchPotato Logo" />
                    <h1 className="text-center">CouchPotato</h1>
                </div>
                <div className="card my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Login</h5>
                        <form className="w-100">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                                    className="form-control form-control-lg" id="exampleInputEmail" aria-describedby="emailHelp"
                                    placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input value={this.state.password} onChange={this.handleChange} type="password" name="password"
                                    className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                            <button onClick={this.signup} className="btn btn-secondary ml-3">Signup</button>
                            <div className="alert alert-danger mt-4 d-none" role="alert" id="alert-danger"></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
