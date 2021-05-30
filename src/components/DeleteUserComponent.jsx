import React, { Component } from 'react';
import userService from '../services/user-service';


class DeleteUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.match.params.id
        }
        
    }
    
    componentDidMount(){
       
        userService.deleteUser(this.state.id).then( res => {
            this.props.history.push("/admin")
        })
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default DeleteUserComponent;