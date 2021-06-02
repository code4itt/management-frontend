import logo from './logo.svg';
import './App.css';
import './homepage.css';
import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route,Link,Redirect,NavLink} from 'react-router-dom';
import AuthService from './services/auth-service';
import AdminBoardComponent from './components/AdminBoardComponent';
import FooterComponent from './components/FooterComponent';

import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import ModeratorBoardComponent from './components/ModeratorBoardComponent';
import ProfileComponent from './components/ProfileComponent';
import RegisterComponent from './components/RegisterComponent';
import UserBoardComponent from './components/UserBoardComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import DeleteUserComponent from './components/DeleteUserComponent';
import UserQRCodeComponent from './components/UserQRCodeComponent';
import PrivateRoute from './components/PrivateRoute';
import UploadingPostComponent from './components/UploadingPostComponent';
import UpdatePostsComponent from './components/UpdatePostsComponent';

class App extends Component{

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
        showModeratorBoard : false,
        currentUser : undefined,
        showAdminBoard : false
    }
}

componentDidMount(){
    const user = AuthService.getCurrentUser();

    if(user){
        this.setState({
            currentUser: AuthService.getCurrentUser(),
            showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN")
        })
    }
}

logOut = () => {
    AuthService.logout();
}

render(){
  const {currentUser,showAdminBoard,showModeratorBoard} = this.state;
  return (
        <Router>
           
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <NavLink exact to={"/home"} className="navbar-brand">
                    <img src="ssyahi.png" alt="Logo" style={{width:'60px',height:'40px',padding:'2px'}}/>
                    </NavLink>
                  
                
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to={"/home"} className="nav-link">
                            <p className="h1-class">Home</p>
                            </NavLink>
                        </li>
                
                
                {
                showModeratorBoard &&(
                    <li className ="nav-item">
                        <NavLink exact to={"/mod"} className="nav-link">
                        <p className="h1-class">Moderator Board</p>
                        </NavLink>
                    </li>
               )}

                {
                showAdminBoard &&(
                    <li className ="nav-item">
                        <NavLink exact to={"/admin"} className="nav-link">
                        <p className="h1-class">Admin Board</p>
                        </NavLink>
                    </li>
               )}
               {
                currentUser &&(
                    <li className ="nav-item">
                        <NavLink exact to={"/user"} className="nav-link">
                        <p className="h1-class">Feed</p>
                        </NavLink>
                    </li>
               )}
                
                </div>
                {
                currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className ="nav-item">
                        <NavLink exact to={"/upload-post"} className="nav-link">
                        <p className="h1-class">Upload Post</p>
                        </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to ={"/profile"} className="nav-link">
                            <p className="h1-class">{currentUser.username}</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                            <p className="h1-class">Logout</p>
                            </a>
                        </li>
                    </div>
               ) :( 
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink exact to={"/login"} className="nav-link">
                            <p className="h1-class">Login</p>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/register"} className="nav-link">
                            <p className="h1-class">Signup</p>
                            </NavLink>
                        </li>

                    </div>
                )}

                </nav>
                
            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/","/home"]} component = {HomeComponent}/>
                    <Route exact path="/login" component = {LoginComponent}/>
                    <Route exact path="/register" component = {RegisterComponent}/>
                    <PrivateRoute exact path="/profile" component = {ProfileComponent}/>
                    <PrivateRoute exact path="/user" component = {UserBoardComponent}/>
                    <PrivateRoute exact path="/admin" component = {AdminBoardComponent}/>
                    <PrivateRoute exact path="/mod" component = {ModeratorBoardComponent}/>
                    <PrivateRoute exact path="/update-user/:username" component = {UpdateUserComponent}/>
                    <PrivateRoute exact path="/delete-user/:id" component = {DeleteUserComponent}/>
                    <PrivateRoute exact path="/QRCode/:username" component = {UserQRCodeComponent}/>
                    <PrivateRoute exact path="/upload-post" component = {UploadingPostComponent}/>
                    <PrivateRoute exact path="/update-post/:postid/:username/:post" component = {UpdatePostsComponent}/>
                    <PrivateRoute exact path="/delete-post/:postid" component = {UploadingPostComponent}/>
                </Switch>
                
            </div>
            </div>
          
            
        </Router>
        
    );
}
}

export default App;
