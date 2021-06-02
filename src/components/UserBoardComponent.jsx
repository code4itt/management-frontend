import React, { Component } from 'react';
import postService from '../services/post-service';
import userService from '../services/user-service';
import authService from '../services/auth-service';
import InfiniteScrolls from './InfiniteScrolls';

class UserBoardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            posts: [],
            username: "",
            isPostVisible: false
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);

    }
    updateUser(id) {
        this.props.history.push(`/update-user/${id}`)
    }

    deleteUser(id) {

        this.props.history.push(`/delete-user/${id}`)
    }

    componentDidMount() {

        userService.getUserContent().then(res => {
            console.log(JSON.stringify(res.data));
            this.setState({ user: res.data })
        })

        let user = authService.getCurrentUser();
        this.setState({ username: user.username })
    }

    makePostVisible = () => {
        postService.getPostByUsername(this.state.username).then(res => {
            this.setState({ posts: res.data,isPostVisible : true });
        })
    }

    generateQRCode = (code) => {
        this.props.history.push("/QRCode/" + code);
    }

    editQuoteHandler = (postid,post,username) => {

        this.props.history.push(`/update-post/${postid}/${username}/${post}`)
       
    }

    deleteQuoteHandler(username, postId ) {
        postService.deletePost(username,postId).then(res => {
            this.setState({isPostVisible : true,message : res.data });
            this.makePostVisible();
        },
        error => {
            const resMessage = (
                error.res && error.res.data && error.res.message || error.message || error.toString()
            )
            this.setState({message: resMessage})
        }
       
        )
    }

    render() {
        return (
            <div className="container">
                <div className="card-header" style={{background:'#C6EAEA'}}>
                <h2 className="text-center">Your Data</h2>
                </div>
                <br></br>
                <br></br>
                <table className="table table-striped table-bordered">
                    <thead className="h1-class-black" style={{background:'#C4D5E7'}}>
                        <td>Name</td>
                        <td>User Name</td>
                        <td>Email</td>
                        <td>Age</td>
                        <td>Mobile No</td>
                        <td>UserID</td>
                        <td>Roles</td>
                        <td>QR Code</td>
                        <td>Actions</td>
                    </thead>
                    <tbody>
                        {
                            this.state.user.map(
                                users =>
                                    <tr key={users.id} style={{background:'#C6EAEA'}} >
                                        <td>{users.name}</td>
                                        <td>{users.username}</td>
                                        <td>{users.email}</td>
                                        <td>{users.age}</td>
                                        <td>{users.mobileno}</td>
                                        <td>{users.id}</td>
                                        <td>
                                            {users.roles.map(roless => <li>{roless.role}</li>)}
                                        </td>
                                        <td> <button className="btn btn-success" onClick={() => this.generateQRCode(users.username)}>Generate QR Code</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => this.updateUser(users.username)}>Update</button>

                                            {'   '}
                                            <button className="btn btn-danger" onClick={() => this.deleteUser(users.id)}>Delete</button>

                                        </td>
                                    </tr>
                            )

                        }

                    </tbody>
                </table>
                <div><h3 style={{color:"green"}}>{this.state.message}</h3></div>
                <InfiniteScrolls></InfiniteScrolls>
            </div>
        );
    }
}

export default UserBoardComponent;