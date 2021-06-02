import React, { Component } from 'react';
import postService from '../services/post-service';

class UpdatePostsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quote: this.props.match.params.post,
            message: "",
            username:this.props.match.params.username,
            id:this.props.match.params.postid,
            new_quote: ""
        }

        this.addquotehandler = this.addquotehandler.bind(this);
        this.updatePost = this.updatePost.bind(this);
    }

    componentDidMount(){
       
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        this.setState({date:date,time:time});

    }

    addquotehandler = (event) =>
    {
        this.setState({quote : event.target.value});
        this.setState({new_quote : event.target.value});
    }

    updatePost = (event) => {
        event.preventDefault();

        postService.updatePost(this.state.id,this.state.new_quote,this.state.username).then(res => {
            this.setState({message : res.data });
        },
        error => {
            const resMessage = (
                error.res && error.res.data && error.res.message || error.message || error.toString()
            )
            this.setState({message: resMessage})
        })
    }

    render() {
        return (
            <div>
                <div class="card text-center">
                            <div class="card-header">
                            <h2>Update some good change...</h2>
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                <form>
                                    <div className="form-group">
                                        
                                        <textarea type="textarea" rows="15" cols="40" className="form-control" name="quote" value={this.state.quote} onChange={this.addquotehandler} />
                                    </div>
                                    <br></br>
                                    <div>
                                        <button className="btn btn-success btn-block buttonsize" onClick={this.updatePost}>Update Quote</button>
                                    </div>
                                    <br></br>
                                    </form>
                                    <footer class="blockquote-footer"><cite title="Source Title">{this.state.username}</cite></footer>
                                </blockquote>
                            </div>
                            <div class="card-footer text-muted">
                                {this.state.date}  {'    '} {this.state.time}
                            </div>
                            <div>
                                <h3 className="text-center" style={{ color: "green" }}>{this.state.message}</h3>
                            </div>
                </div>
            </div>
        );
    }
}

export default UpdatePostsComponent;