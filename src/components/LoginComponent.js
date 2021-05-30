import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class LoginComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
    //false,isLoggedIn
      username: "",
      password: "",
      fbusername: "",
      fbpassword: "",
      message: "",
      loading: true,
      resMessage: ""
    }
    //this.facebooksignin = this.facebooksignin.bind(this);


  }


  addusernamehandler = (event) => {
    this.setState({ username: event.target.value });
  }

  addpasswordhandler = (event) => {
    this.setState({ password: event.target.value });
  }

  submitblock = (event) => {
   // const loading = true;
    const resMessage = "";
    event.preventDefault();
   //const error = "";
    if(this.state.loading){
      AuthService.login(this.state.username, this.state.password).then(res => {
        this.props.history.push("/home");
        window.location.reload();
      },
      error => {
        const resMessage = 
        (error.response && 
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
  
        this.setState({
          loading: true,
          message: resMessage
        })
      }
      )}
    
    else{
      this.setState({
        loading: true,
        message: resMessage
      })
    }
    
}

  signup = () => {
    this.props.history.push("/register");
  }

  componentClicked = (event) => {
    event.preventDefault();
  }

  componentDidCatch(error, errorInfo){
    this.setState({
      loading: true,
      message: errorInfo
    })
    this.props.history.push("/login")
  }

  responseFacebook = (res) => {
    console.log(res);
    try{
    this.setState({
      isLoggedIn: true,
      accessToken: res.accessToken,
      dob: res.birthday,
      fbusername: res.userID,
      name: res.name,
      email: res.email,
      picture: res.picture.data.url,
      fbpassword: "defaultpassword",
      mobileno: "0000000000",
      loading: true
    });
  }catch (error) {
    this.state.message = error.message || 'I broke!'
    return <span className="broken-component">{this.state.message}</span>
  }

    console.log("Access Token From Facebook: " + JSON.stringify(this.state.accessToken));
      const resMessage="";
      if(this.state.loading){
       
        AuthService.facebookLogin(this.state.fbusername,this.state.name,
          this.state.email,this.state.age,this.state.mobileno,
           this.state.fbpassword,this.state.dob)
          .then((response) => {
            {
            if(response !== ""){
            console.log("====>>" + JSON.stringify(response));
            //localStorage.setItem("accessToken", response.data);
            this.setState({
              loading: true,
              message: JSON.stringify(response)
            })
            
           }else{
            this.setState({
              loading: true,
              message: "User already Resgistered!!"
            })
           } }
          },
        error => {
          
          const resMessage = 
          (error.response && 
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
    
          this.setState({
            loading: true,
            message: resMessage
          })
        }
        )}
      
      else{
        this.setState({
          loading: true,
          message: resMessage
        })
      }
    
  }
  
  render() {

    let fbContent = (
      <FacebookLogin
        appId="1191983531252082"
        autoLoad={false}
        scope="email,user_birthday"
        returnScopes={true}
        fields="name,email,picture,birthday"
        onClick={this.renderProps}
        callback={this.responseFacebook.bind()}
        render= {renderProps => (
          <button className="btn btn-primary text-center center buttonsizelarge" onClick={renderProps.onClick}>Signup With Facebook</button>
        )}
      />
    );

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Login</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.addusernamehandler} placeholder="Enter username" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.addpasswordhandler} placeholder="Enter password" />
                  </div>
                  <br></br>
                  <div>
                    <button className="btn btn-primary btn-block buttonsize" onClick={this.submitblock} href="/home">Login</button>

                    <button type="button" className="btn btn-danger btn-block buttonsize" onClick={this.signup.bind(this)}>Signup</button>
                  </div>
                  <br></br>
                  <div>
                    <h3 className="text-center" style={{color:"red"}}>{this.state.message}</h3>  
                  </div>
                  <br></br>
                  <div>
                    <h4 className="text-center">----------------OR-------------------</h4>
                  </div>
                  <br></br>
                </form>

                <div>
                  {fbContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;