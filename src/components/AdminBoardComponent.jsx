/*
import React, { Component } from 'react';
import userService from '../services/user-service';

class AdminBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : ""
        }
    }
    
    componentDidMount(){
        userService.getAdminContent().then(res => {
            this.setState({message: res.data})
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card card-body">
                    {
                        <p>
                            {this.state.message}
                        </p>
                    }
                </div>
            </div>
        );
    }
}

export default AdminBoardComponent;
*/

import React, { Component } from 'react';
import userService from '../services/user-service';

class AdminBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:[],
            QRImage: "",
            QRgenerated: false,
            image: null,
            loading: true
        }
        
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.generateQRCode = this.generateQRCode.bind(this);
    }

    componentDidMount() {
        userService.getAdminContent().then(res => {
            this.setState({user: res.data,loading: false})
          
        });
        

    }

    generateQRCode = (code) => {
      
        this.props.history.push("/QRCode/"+code);
        
      }

    addUser = () => {
        this.props.history.push("/register");
    }

    updateUser(id) 
    {
        this.props.history.push(`/update-user/${id}`)
    }

    deleteUser(id){
        
        this.props.history.push(`/delete-user/${id}`)
    }

    render() {
        return (
            
            <div className="container">
                
                <div className="card-header" style={{background:'#C6EAEA'}}>
                <h2 className="text-center">All User's Data</h2>
                </div>
                <br></br>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addUser}>Add User</button>
                </div>
                <br></br>
                {!this.state.loading ? (
                <table className="table table-striped table-bordered">
                    <thead className="h1-class-black" style={{background:'#C4D5E7'}}>
                        <td>Name</td>
                        <td>User Name</td>
                        <td>Email</td>
                        <td>Age</td>
                        <td>Mobile No</td>
                        <td>UserID</td>
                        <td>Authorities</td>
                        <td>QR Code</td>
                        <td>Action</td>
                    </thead>
                    <tbody>
                        {
                            this.state.user.map(
                            users =>
                            <tr key = {users.id} style={{background:'#C6EAEA'}}>
                                <td>{users.name}</td>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td>{users.age}</td>
                                <td>{users.mobileno}</td>
                                <td>{users.id}</td>
                                <td>
                                {users.roles.map(iterateRoles => <li>{iterateRoles.role}</li>)}
                                </td>
                                <td> <button className="btn btn-success" onClick={() => this.generateQRCode(users.username)}>Generate QR Code</button>
                                </td>
                                <td>
                                <button className="btn btn-primary" onClick={() => this.updateUser(users.username)}>Update</button>
                                   
                                    {'   '}
                                <button className="btn btn-danger" onClick={ () => this.deleteUser(users.id)}>Delete</button>
                                
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

export default AdminBoardComponent;