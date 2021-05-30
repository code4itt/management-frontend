import React, { Component } from 'react';
import userService from '../services/user-service';

class UserBoardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: []
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
    }

    generateQRCode = (code) => {
        this.props.history.push("/QRCode/"+code);
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center text-muted">Your Data</h1>
                
                <br></br>
                <table className="table table-striped table-bordered">
                    <thead>
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
                                    <tr key={users.id}>
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
            </div>
        );
    }
}

export default UserBoardComponent;