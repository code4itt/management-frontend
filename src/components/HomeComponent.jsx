import React, { useCallback, useState,Component } from 'react';
import authService from '../services/auth-service';
import postService from '../services/post-service';
import userService from '../services/user-service';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types'
import HomeScrollComponent from './HomeScrollComponent'
import FacebookLikeHomepage from './FacebookLikeHomepage';
import HomeScrollComponentCopy from './HomeScrollComponentCopy';

class HomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            makevisible: true,
            posts: []
        }

        userService.getUserContent().then(res => {
            this.setState({ message: res.data })
        })
    }

    componentDidMount() {
        let user = authService.getCurrentUser();
        console.log("Userrrr ====>>" + JSON.stringify(user));
        if (user != null)
            this.setState({ name: user.name });

        if (user === null) {
            this.setState({ makevisible: false })
        }

        postService.getAllPost().then(res => {
            this.setState({ posts: res.data });
            console.log(JSON.stringify(this.state.posts))
        },
            error => {
                const resMessg = (error.res && error.res.message || error.data || error.toString())

                this.setState({ message: resMessg });
            })
    }

    render() {

        if (this.state.makevisible) {

            return (
                <div className="Container">
                    <div>
                        <div className="card-header" style={{background:'#C6EAEA'}}>
                            <h2 className="text-center">Welcome {this.state.name}!</h2>
                        </div>
                        <br></br><br></br>
                        
                        <HomeScrollComponent></HomeScrollComponent>
                        
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="Container div-centered-login">
                    <div className="card">
                        <div className="card-header" style={{background:'#C6EAEA'}}>
                            <h2 className="text-center">Welcome To Our Home Page</h2>
                        </div>
                        <p className="card-body blockquote text-center">
                            Oops. You have to login to see the details. If not a member, signup with us...
                    </p>
                    <div className="center">
                    <button className="btn btn-primary btn-block buttonsizebig" onClick={() => this.props.history.push("/login")}>Login</button>
                    <br></br>
                    <button className="btn btn-success btn-block buttonsizebig" onClick={() => this.props.history.push("/register")}>SignUp</button>
                    </div>
                    </div>
                </div>
            )
        }
    }
}

export default HomeComponent;