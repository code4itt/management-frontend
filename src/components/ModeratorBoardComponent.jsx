import React, { Component } from 'react';
import userService from '../services/user-service';

class ModeratorBoardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:[]
        }
      
    }

    componentDidMount() {
        userService.getModeratorContent().then(res => {
            this.setState({user: res.data})
            console.log(JSON.stringify(this.state.user));
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center text-muted">User's Data</h1>
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
                    </thead>
                    <tbody>
                        {
                            this.state.user.map(
                            users =>
                            <tr key = {users.id}>
                                <td>{users.name}</td>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td>{users.age}</td>
                                <td>{users.mobileno}</td>
                                <td>{users.id}</td>
                                <td>
                                {users.roles.map(rolee => <li>{rolee.role}</li>)}
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

export default ModeratorBoardComponent;