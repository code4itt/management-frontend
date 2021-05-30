import logo from './logo.svg';
import './App.css';
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
                        User Management
                    </NavLink>
                  
                
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to={"/home"} className="nav-link">
                            Home
                            </NavLink>
                        </li>
                
                
                {
                showModeratorBoard &&(
                    <li className ="nav-item">
                        <NavLink exact to={"/mod"} className="nav-link">
                            Moderator Board
                        </NavLink>
                    </li>
               )}

                {
                showAdminBoard &&(
                    <li className ="nav-item">
                        <NavLink exact to={"/admin"} className="nav-link">
                            Admin Board
                        </NavLink>
                    </li>
               )}
               {
                currentUser &&(
                    <li className ="nav-item">
                        <NavLink exact to={"/user"} className="nav-link">
                            User
                        </NavLink>
                    </li>
               )}
                
                </div>
                {
                currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink exact to ={"/profile"} className="nav-link">
                            {currentUser.username}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                            Logout
                            </a>
                        </li>
                    </div>
               ) :( 
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink exact to={"/login"} className="nav-link">
                            Login
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/register"} className="nav-link">
                            Sign Up
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
                </Switch>
            </div>
            </div>
            <FooterComponent></FooterComponent>
            
        </Router>
        
    );
}
}

export default App;
