import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <h1 className="navbar-brand text-light" href="#"><strong>User Management System</strong></h1>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-item nav-link active text-light" href="/login">Login<span class="sr-only">(current)</span></a>
                            <a className="nav-item nav-link text-light" href="/signup">Signup</a>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default HeaderComponent;