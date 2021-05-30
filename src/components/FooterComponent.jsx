import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <div className="text-center p-3 dark footer">
                © 2021 Copyright: {'  '}
                <a className="text-white" href="https://www.google.com/"> userservice.com</a>
            </div>
        );
    }
}

export default FooterComponent;