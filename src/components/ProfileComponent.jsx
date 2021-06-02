import React, { Component } from 'react';
import authService from '../services/auth-service';
import isEmail from 'react-validation';
import userService from '../services/user-service';
import { Redirect } from 'react-router';

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
    if(value.length != 10){
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

class ProfileComponent extends Component {
    
    constructor(props) {
        super(props);

        this.addusernamehandler = this.addusernamehandler.bind(this);
        this.addnamehandler = this.addnamehandler.bind(this);
        this.addemailhandler = this.addemailhandler.bind(this);
        this.addmobilenohandler = this.addmobilenohandler.bind(this);
        this.addagehandler = this.addagehandler.bind(this);
        this.addpasswordhandler = this.addpasswordhandler.bind(this);
        this.submitblock = this.submitblock.bind(this);
        this.validateOTP = this.validateOTP.bind(this);
        this.sendOtp = this.sendOtp.bind(this);
        this.bindOTP = this.bindOTP.bind(this);

        this.state = {
            isOTPvalidated: false,
            isOTPsent: false,
            username: "",
            email: "",
            name: "",
            age: "",
            mobileno: "",
            role: [],
            successful: false,
            message: "",
            id:"",
            respMessage: "",
            enteredOTP:""
            
            
        }
        
    }

    componentDidMount() {
        let user = authService.getCurrentUser();
        this.setState({username: user.username,
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            mobileno: user.mobileno,
            role: user.roles})
        
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

    sendOtp = (event) => {
       // window.alert('Sending OTP... Pls wait for sometime!!')
        userService.sendOTP(this.state.id).then(res => {
            if(res.data){
            this.setState({respMessage: res.data,isOTPsent: true});
            this.props.history.push("/profile");
            }
        },
        error => {
            const resMessage = (
                error.res && error.res.data && error.res.message || error.message || error.toString()
            )
            this.setState({respMessage: resMessage})
            
        })
    }

    sendintOTPMethod = (event) =>{
        event.preventDefault();
        this.setState({respMessage:"Sending OTP..."})
        this.sendOtp();
    }

    bindOTP = (event) => {
        this.setState({enteredOTP:event.target.value});
    }

    validateOTP = (event) =>
    {
        this.setState({respMessage:''})
        const resMessage = "";
        event.preventDefault();
        if(this.state.isOTPsent){
        
        userService.validateOTP(this.state.enteredOTP).then(res =>{
            console.log("Validate otp : "+ res.data);
            if(res.data){
                this.setState({respMessage: "Successfully validated the OTP",isOTPvalidated: true});
                this.props.history.push("/profile");
                }
                else{
                    this.setState({respMessage: "Entered OTP is not correct, Please try again!"});
                    this.props.history.push("/profile");
                }
        },
        error => {
            const message = 
            (error.response && 
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
      
            this.setState({
              loading: true,
              respMessage: message
            })
          }
          )}
          else{
            this.setState({
                loading: true,
                respMessage: 'OTP no sent...'
              })
          }
    }
    
    
    submitblock = (event) => {
        event.preventDefault();
        this.setState({respMessage:''})
        userService.updateYourDetails(this.state.id,this.state.username,
            this.state.name,this.state.email,this.state.age,this.state.mobileno,this.state.password,this.state.role)
            .then(res => {
            this.setState({respMessage: "Your profile is updated successfully",isOTPsent: false,isOTPvalidated: false});
                this.props.history.push("/profile");
                
            },
            error => {
            const resMessage = (
                error.res && error.res.data && error.res.message || error.message || error.toString()
            )
            this.setState({respMessage: resMessage})
            })
    }

    cancel = (event) => {
        event.preventDefault();
        window.location.reload();
    }
    
    render() {
        return (
            <div style={{backgroundColor:'#1789ac'}}>
                <br></br>
                <div>
                    <div className="container">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-header" style={{background:'#C6EAEA'}}>
                        <h3 className="text-center">Profile Details</h3>
                        </div> 
                            <div className="card-body">
                            <div className="center"> <p style={{color: "green"}}><h5>{this.state.respMessage}</h5></p></div>
                            
                                <form>
                                    <div className="form-group">
                                    <label><b>Username:</b></label>
                                        <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.addusernamehandler} validations= {[required,vusername]} readOnly/>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                    <label><b>Name:</b></label>
                                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.addnamehandler} validations= {[required,vname]} readOnly/>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                    <label><b>Email:</b></label>
                                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.addemailhandler} validations= {[required,vemail]}/>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                    <label><b>Age:</b></label>
                                        <input type="number" className="form-control" name="age" value={this.state.age} onChange={this.addagehandler} validations= {[required,vage]}/>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                    <label><b>Mobile no:</b></label>
                                        <input type="number" className="form-control" name="mobileno" value={this.state.mobileno} onChange={this.addmobilenohandler} validations= {[required,vmobilno]}/>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                    <label><b>Authorities:</b></label>
                                        {this.state.role.map( rolee => <li>{rolee}</li>)}
                                    </div><br></br>
                                    {
                                    !this.state.isOTPsent && (
                                    <div className="form-group">
                                        <label><p><b>Want to update your profile, verify by sending otp?</b></p></label>
                                        <div>
                                        <button className="btn btn-success buttonsize" onClick={this.sendintOTPMethod} >Send OTP</button>
                                        </div>
                                    </div>)
                                    }
                                    {
                                        this.state.isOTPsent && !this.state.isOTPvalidated && (
                                        <div>
                                        <br></br>
                                        <form>
                                        <div className="form-group">
                                        <label><b>Enter OTP:</b></label>
                                        <input type="number" className="form-control" name="OTP" value={this.state.enteredOTP} onChange={this.bindOTP} />
                                        </div> 
                                        <br></br>
                                        <div>
                                        <button className="btn btn-success buttonsize" onClick={this.validateOTP}>Validate OTP</button>
                                        </div>
                                         </form> 
                                         </div>
                                        )
                                    }
                                    
                                    {
                                    this.state.isOTPvalidated && (
                                    <div>
                                   
                                    <div className="form-group">
                                    <label><b>Change Password:</b></label>
                                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.addpasswordhandler} placeholder="Enter new password" validations= {[required,vpasswrod]}/>
                                    </div>
                                    <br></br>
                                    <div>
                                    <button className="btn btn-success buttonsize" onClick={this.submitblock}>Update</button>
                                    <button className="btn btn-danger buttonsize" onClick={this.cancel.bind()}>Cancel</button>
                                    <br></br>
                                    </div>
                                   
                                    </div>) 
                                    
                                    
    }
                                    <br/>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileComponent;