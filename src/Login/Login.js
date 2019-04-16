import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import {Link} from "react-router-dom";
import fire from "../config/Fire";

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: "",
            password: "",
            redirect: false,
            status: "LOADED"
        }
    }


    login(e) {

        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.setState(()=>({
                status: "LOADING",
                redirect:true,
            }));
        }).catch((error) => {
            console.log(error);
            let alert = document.getElementById("alert-danger");
            alert.classList.remove('d-none');
            alert.innerHTML = error.message;
            this.setState(()=>({
                status:"LOADED"
            }));
            
        })
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
        document.getElementById("alert-danger").classList.add('d-none'); // remove error message if user writes something in inputs
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        let html="";
        if (this.state.redirect===true){
            return <Redirect to="/"/>
        }
        switch (this.state.status) {
            case "LOADING":
                html = <div className="lds-roller"></div>;
                break;
            case "LOADED":
                html=<div className="card my-5">
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
        }
        return (
            <div className="col-lg-5 mx-auto">
                <div className="mt-5">
                    <img src="/img/soffpotatis.png" className="w-25 mx-auto d-block" alt="CouchPotato Logo" />
                    <h5 className="text-center">Welcome to CouchPotato! 
                    Login or Signup to get personalised recommendations based on your favorite movies! 
                    Add movies to your watch list and you'll never forget which movies you want to see!</h5>
                </div>
                {html}
            </div>
        );
    }
}

export default Login;
