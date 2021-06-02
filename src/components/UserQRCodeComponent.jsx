import React, { Component } from 'react';
import userService from '../services/user-service';

class UserQRCodeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.match.params.username,
            image: null,
            QRDownloaded: false,
            loading: true
        }

    }

    componentDidMount() {
        userService.getQRImage(this.state.username, 300, 300).then(response => {
            var base64 = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );
            this.setState({
                QRDownloaded: true,
                message: "QR code is successfully generated..."
            })
            this.setState({ image: "data:;base64," + base64 });
            this.setState({loading: false});
        },
        error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: "QR Code Generation Failed: " + resMessage
                })
            })
    }

    render() {
        return (
            <div className="div-centered-login">
                {!this.state.loading ? (
                <div><img src={this.state.image} />
                <p className="text-light center"><b>Code: {this.state.username}</b></p></div>
                ):(
                    <div><p className="text-light center"><b>Generating...</b></p></div>
                )
                }
                <br></br>
                <div>
                    {  this.state.QRDownloaded ?
                    (<div><a className="btn btn-dark btn-block buttonsizebig" href={this.state.image} download={this.state.username + "QRCode.png"}>Download QR Code</a>
                    </div>) : (<div><a className="btn btn-danger" href="/home">Go Home</a></div>)
                    }
                    <br></br>
                    <div style={{color: 'white'}}>{
                        this.state.QRDownloaded ? (<p>{this.state.message}</p>)
                            : (<p>{this.state.message}</p>)
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default UserQRCodeComponent;