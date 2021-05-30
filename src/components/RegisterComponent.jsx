import React, { Component } from 'react';
import authService from '../services/auth-service';
import isEmail from 'react-validation';

const required = value => {
    if(!value) {
        return(
        <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
       );
    }
};

const vemail = value => {
    if(!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email!
            </div>
        );
    }
};

const vusername = value =>{
    if(value.length < 3 || value.length > 20){
        return(
        <div className ="alert alert-danger" role="alert">
            The username must be between 3 to 20 characters!
        </div>
            );
    }
};

const vpasswrod = value =>{
    if(value.length < 6 || value.length > 40){
        return(
        <div className ="alert alert-danger" role="alert">
            The password must be between 6 to 40 characters!
        </div>
            );
    }
};

const vmobilno = value =>{
    if(value.length !== 10){
        return(
        <div className ="alert alert-danger" role="alert">
            The Mobile Number is invalid!
        </div>
            );
    }
};

const vage = value =>{
    if(vage < 18 || vage > 120){
        return(
        <div className ="alert alert-danger" role="alert">
            The Age is not allowed to register to our application!
        </div>
            );
    }
};

const vname = value =>{
    if(vage.length > 50){
        return(
        <div className ="alert alert-danger" role="alert">
           Name should not be more than 50 characters!
        </div>
            );
    }
};



class RegisterComponent extends Component {

    constructor(props) {
        super(props);

        this.addusernamehandler = this.addusernamehandler.bind(this);
        this.addnamehandler = this.addnamehandler.bind(this);
        this.addemailhandler = this.addemailhandler.bind(this);
        this.addmobilenohandler = this.addmobilenohandler.bind(this);
        this.addagehandler = this.addagehandler.bind(this);
        this.addpasswordhandler = this.addpasswordhandler.bind(this);
        this.submitblock = this.submitblock.bind(this);
        
        this.state = {
            username: "",
            email: "",
            name: "",
            password: "",
            age: "",
            mobileno: "",
            successful: false,
            message: ""
        }
        
    }

    addusernamehandler = (event) => {
        this.setState({username: event.target.value})
    }
    addnamehandler = (event) => {
        this.setState({name: event.target.value})
    }
    addemailhandler = (event) => {
        this.setState({email: event.target.value})
    }
    addmobilenohandler = (event) => {
        this.setState({mobileno: event.target.value})
    }
    addagehandler = (event) => {
        this.setState({age: event.target.value})
    }
    addpasswordhandler = (event) => {
        this.setState({password: event.target.value})
    }
    
    submitblock = (event) => {

        event.preventDefault();
        let user = {username: this.state.username,name: this.state.name,
                    email: this.state.email,age: this.state.age,mobileno: this.state.mobileno,
                    password: this.state.password}
            console.log("User here is ===>"+JSON.stringify(user));
         authService.register(this.state.username,this.state.name,
           this.state.email,this.state.age,this.state.mobileno,
            this.state.password).then(res => {
                this.props.history.push("/home");
            })
    }

    cancel = () => {
        this.props.history.push("/");
    }
    
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center text-primary">Sign Up</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.addusernamehandler} placeholder="Enter username" validations= {[required,vusername]}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.addnamehandler} placeholder="Enter name" validations= {[required,vname]}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.addemailhandler} placeholder="Enter email" validations= {[required,vemail]}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input type="number" className="form-control" name="age" value={this.state.age} onChange={this.addagehandler} placeholder="Enter age" validations= {[required,vage]}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Mobile No.</label>
                                        <input type="number" className="form-control" name="mobileno" value={this.state.mobileno} onChange={this.addmobilenohandler} placeholder="Enter mobile No." validations= {[required,vmobilno]}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.addpasswordhandler} placeholder="Enter password" validations= {[required,vpasswrod]}/>
                                    </div>
                                    <br></br>
                                    <button className="btn btn-primary" onClick={this.submitblock}>Signup</button>
                                    {'   '}
                                    <button type="cancel" className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;