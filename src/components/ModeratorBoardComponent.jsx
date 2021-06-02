import React, { Component } from 'react';
import userService from '../services/user-service';

class ModeratorBoardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:[],
            loading:true
        }
      
    }

    componentDidMount() {
        userService.getModeratorContent().then(res => {
            this.setState({user: res.data,loading: false})
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card-header" style={{background:'#C6EAEA'}}>
                <h2 className="text-center">User's Data</h2>
                </div>
                <br></br>
                <br></br>
                {!this.state.loading ? (
                <table className="table table-striped table-bordered">
                    <thead className="h1-class-black" style={{background:'#C6EAEA'}}>
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
                            <tr key = {users.id} style={{background:'#C4D5E7'}}>
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
                 ):(<div className="center"><h4><b>Loading...</b></h4></div>)}
            </div>
        );
    }
}

export default ModeratorBoardComponent;