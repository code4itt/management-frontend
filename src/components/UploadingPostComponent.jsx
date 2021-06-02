import React, { Component } from 'react';
import postService from '../services/post-service';

class UploadingPostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quote: "",
            message: "",
            username:"",
            uploading: true
        }

        this.addquotehandler = this.addquotehandler.bind(this);
        this.uploadPost = this.uploadPost.bind(this);
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"));
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        this.setState({username: user.username,date:date,time:time});

    }

    addquotehandler = (event) =>
    {
        this.setState({quote : event.target.value});
    }

    uploadPost = (event) => {
        event.preventDefault();
        this.setState({message : 'Updating...',uploading:false});
        postService.uploadPost(this.state.quote,this.state.username).then(res => {
            this.setState({message: res.data});
        },
        error => {
            const resMessage = (
                error.res && error.res.data && error.res.message || error.message || error.toString()
            )
            this.setState({respMessage: resMessage})
            })
        
    }

    render() {
        return (
            <div>
                {this.state.uploading ? (
                <div class="card text-center">
                            <div class="card-header" style={{background:'#C4D5E7'}}>
                            <h2>Let's upload some good quotes...</h2>
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote">
                                <form>
                                    <div className="form-group">
                                        
                                        <textarea type="textarea" rows="10" cols="30" className="form-control" name="quote" value={this.state.quote} onChange={this.addquotehandler} placeholder="Enter quote..." />
                                    </div>
                                    <br></br>
                                    <div>
                                        <button className="btn btn-success btn-block buttonsizebig" onClick={this.uploadPost}>Upload</button>
                                    </div>
                                    
                                </form>
                                    <cite title="Source Title">{this.state.username}</cite>
                                </blockquote>
                            </div>
                            <div class="card-footer text-muted" style={{background:'#C4D5E7'}}>
                                {this.state.date}  {'    '} {this.state.time}
                            </div>
                        
                </div>
                ):(
                <div>
                    <h3 className="text-center div-centered" style={{ color: "green" }}>{this.state.message}</h3>
                    <div className="div-centered">
                    <div className="row">
                        <button className="btn btn-success btn-block" onClick={() => this.props.history.push('/user')}>GO TO YOUR FEED</button>
                    </div>
                    <br></br>
                    <div className="row">
                        <button className="btn btn-success btn-block" onClick={() => this.props.history.push('/home')}>GO TO HOMEPAGE</button>
                    </div>
                    <br></br>
                    <div className="row">
                        <button className="btn btn-success btn-block" onClick={() => window.location.reload()}>UPLOAD ANOTHER QUOTES</button>
                    </div>
                    </div>
                    
                </div>
                    )
                }
            </div>
        );
    }
}

export default UploadingPostComponent;