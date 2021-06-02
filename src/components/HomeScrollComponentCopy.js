import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios';
import authHeader from "../services/auth-header";
import postService from '../services/post-service';

const HomeScrollComponentCopy = () => {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const editQuoteHandler = (postid, post, username) => {

        //props.history.push(`/update-post/${postid}/${username}/${post}`)

    }

    const deleteQuoteHandler = (username, postId) => {
        postService.deletePost(username, postId).then(res => {
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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [image, setImage] = useState(null);
    const [imageUsername, setImageUsername] = useState('');

    const observer = useRef();

    const lastPostRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);

    const loadProducts = () => {

        setLoading(true);
        setError(false);

        let cancel;
        //setTimeout(() => {   
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/post/all',
            params: { page: pageNumber },
            headers: authHeader(),
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {

            setPosts((prevPosts) => {
                return [...new Set([...prevPosts, ...res.data])]
            })
            console.log("This is the response ====.>>>>>" + JSON.stringify(res.data))
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()

    }
    // , 2000)};

    const loadPicture = (imagesUser) =>{
        setImageUsername(imagesUser);
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/QR/genrateQRCode/'+imageUsername+'/150/150',
            
            headers: authHeader(),
            responseType:'arraybuffer'
        }).then(res => {

            var base64 = btoa(
                new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );
            setImage("data:;base64," + base64);
            
        }).catch(e => {
           
            setError(true)
        })
    }
    
    useEffect(() => {
        if (hasMore) {
            loadProducts()
        }
    }, [pageNumber])



    return (

        <div>
            <div>

                {posts.map((iteratePost, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <div ref={lastPostRef} key={index} >
                                <article className="article">

                                    <blockquote>
                                        <p>{iteratePost.post}</p>
                                        <cite>{iteratePost.userName + ' '}<span className="cite-last-name">||</span></cite>
                                        <div className="blockquote-author-image">
                                            <img src={loadPicture(iteratePost.userName)}></img>
                                        </div>
                                    </blockquote>

                                </article>

                                <aside className="controls"><label>Accent color <input type="color" className="js-accent-color" value="#f25aba" /></label></aside>
                            </div>

                        )
                    }
                    else {
                        return (
                            <div key={index} >
                                <div ref={lastPostRef} key={index} >
                                    <article className="article">

                                        <blockquote>
                                            <p>{iteratePost.post}</p>
                                            <cite>{iteratePost.userName + ' '}<span className="cite-last-name">||</span></cite>
                                            <div className="blockquote-author-image" style={{}}></div>
                                        </blockquote>

                                    </article>

                                    <aside className="controls"><label>Accent color <input type="color" className="js-accent-color" value="#f25aba" /></label></aside>
                                </div>
                            </div>
                        )
                    }
                })}
                <div style={{ textAlign: 'center' }}>{loading ? ('Loading...') : ('Yay! you have covered all posts!')}</div>
                <div style={{ textAlign: 'center' }}>{error && 'ERROR...'}</div>
            </div>
        </div>

    )
}

export default HomeScrollComponentCopy