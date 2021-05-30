import React, { Component } from 'react';
import authService from '../services/auth-service';

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            makevisible: true
        }

        userService.getUserContent().then(res => {
            this.setState({message: res.data})
        })
    }
    
    componentDidMount() {
        let user = authService.getCurrentUser();
        console.log("Userrrr ====>>"+JSON.stringify(user));
        if(user != null)
        this.setState({name:user.name});

        if(user === null){
            this.setState({makevisible: false})
        }
    }
    render() {

        if(this.state.makevisible){
       
        return (
            <div className="Container">
                <div className="card">
                    <div className="card-header">
                    <h1 className="text-center">Welcome {this.state.name}</h1>
                    </div>
                    <p className="card-body">
                    User management, in its simplest form, is the method by which you create, remove and
maintain your user store. Any solution designed to serve multiple users must have some type of a user management system, be it a proprietary tool built into the product or a tie into an existing system such as Active Directory/LDAP, or another identity provider.

User management not only establishes a user’s authorization to access secure resources, it also serves as a repository of identities and, if done efficiently, can be the source of all identities for an organization.
                    </p>
                </div>
            </div>
            
        );
        }
        else{
            return(
            <div className="Container">
                <div className="card">
                    <div className="card-header">
                    <h1 className="text-center">Welcome To Our Home Page</h1>
                    </div>
                    <p className="card-body">
                     Oops. You have to login to see the details. If not a member,signup with us...
                    </p>
                </div>
            </div>
            )
        }
    }
}

export default HomeComponent;