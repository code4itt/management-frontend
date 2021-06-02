import React, { useState, useEffect, useCallback, useRef } from 'react'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import authHeader from "../services/auth-header";
import postService from '../services/post-service';

const InfiniteScrolls = () => {

    const history = useHistory();

    const editQuoteHandler = (postid,post,username) => {

        history.push(`/update-post/${postid}/${username}/${post}`)
       
    }
    
    const deleteQuoteHandler= (username, postId ) => {
        postService.deletePost(username,postId).then(res => {
            setHasMore(true);
            window.location.reload();
        },
        error => {
            const resMessage = (
                error.res && error.res.data && error.res.message || error.message || error.toString()
            )
           setError(true)
        }
       
        )
    }

const currentUser = JSON.parse(localStorage.getItem("user"));


const [posts, setPosts] = useState([]);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(true);
const [hasMore, setHasMore] = useState(true);
const [pageNumber, setPageNumber] = useState(0);
const [username, setUsername] = useState(currentUser.username);

const observer = useRef();

const lastPostRef = useCallback(node => {

    if (loading) return
    if(observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {

        if(entries[0].isIntersecting){
            setPageNumber(prevPageNumber => prevPageNumber+1);
        }

    })

    if(node) observer.current.observe(node)

},[loading,hasMore])

const loadPages = () => {

    setLoading(true)
    setError(false)
    setHasMore(true)

    axios({
        method:'GET',
        url:'http://localhost:8080/api/post/user',
        params:{username: username,page:pageNumber},
        headers:authHeader()
    }).then(res => {
        setPosts(prevPosts => [...prevPosts, ...res.data])

        setHasMore(res.data.length > 0)
        setLoading(false)
    },
    error =>
    {
       // const resMessage = (error.res.data && error.res || error.res.data.toString())
       setLoading(false)
        setError(true);
    })

}

useEffect(() => {

    if(hasMore){
        loadPages();
    }
},[pageNumber]) 

return(
    <div >
                <div className="flex flex-col">

                    {posts.map((iteratePost, index) => {
                        if (posts.length === index + 1) {
                            return (
                                <div>
                                <div ref={lastPostRef} key={index} class="card text-center">
                                    <div class="card-header" style={{background:'#C6EAEA'}}>
                                        
                                        <div>
                                            <button className="btn btn-success btn-block buttonsize" onClick={() => editQuoteHandler(iteratePost.id,iteratePost.post,iteratePost.userName)}>Edit Quote</button>
            
                                            <button type="button" className="btn btn-danger btn-block buttonsize" onClick={() => deleteQuoteHandler(iteratePost.userName,iteratePost.id)}>Delete Quote</button>
                                        </div>
                                       
                                    </div>
                                    <div class="card-body" style={{background:'#fff9e5'}}>
                                        <blockquote class="blockquote">
                                            <p>{iteratePost.post}</p>
                                            <cite title="Source Title">{iteratePost.userName}</cite>
                                        </blockquote>
                                    </div>
                                    <div class="card-footer text-muted" style={{background:'#C4D5E7'}}>
                                    <b>{'Posted At: ' + iteratePost.postedAt.toString().replace('Z','').replace('T',' || ')}</b>
                                    </div>

                                   
                                </div>
                                <br></br>
                                </div>
                                
                            )
                        }
                        else {
                            return (
                                <div>
                                <div key={index} class="card text-center">
                                    <div class="card-header" style={{background:'#C6EAEA'}}>
                                    
                                        <div>
                                            <button className="btn btn-success buttonsize" onClick={() => editQuoteHandler(iteratePost.id,iteratePost.post,iteratePost.userName)}>Edit Quote</button>
            
                                            <button type="button" className="btn btn-danger buttonsize" onClick={() => deleteQuoteHandler(iteratePost.userName,iteratePost.id)}>Delete Quote</button>
                                        </div>
                                        
                                    
                                    </div>
                                    <div class="card-body" style={{background:'#fff9e5'}}>
                                        <blockquote class="blockquote">
                                            <p>{iteratePost.post}</p>
                                            <cite title="Source Title">{iteratePost.userName}</cite>
                                        </blockquote>
                                    </div>
                                    <div class="card-footer text-muted" style={{background:'#C4D5E7'}}	>
                                    <b>{'Posted At: ' + iteratePost.postedAt.toString().replace('Z','').replace('T',' || ')}</b>
                                    </div>

                                   
                                </div>
                                <br></br>
                                </div>
                            )
                        }
                    })}
                <div style={{textAlign:'center'}}>{loading ? (<h4><b>Loading...</b></h4>) : (<h4><b>Yay! you have covered all posts!</b></h4>)}</div>
                <div style={{textAlign:'center'}}>{error && 'ERROR...'}</div>
                </div>
        </div>
)
}

export default InfiniteScrolls;