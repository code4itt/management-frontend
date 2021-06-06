import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios';
import authHeader from "../services/auth-header";
import postService from '../services/post-service';
import { useHistory } from 'react-router';

const HomeScrollComponent = () => {

    const history = useHistory();
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [loading, setLoading] = useState(true);
    const [commentMessage, setCommentMessage] = useState('');
    const [commented, setCommented] = useState('');
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);

    const editQuoteHandler = (postid, post, username) => {

        history.push(`/update-post/${postid}/${username}/${post}`)

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

    const updateLike = (usernames, postid) => {
        axios({
            method: 'PUT',
            url: 'http://localhost:8080/api/post/update/like',
            data: { postId: postid, username: usernames },
            headers: authHeader()
        }).then(res => {

            const newData = posts.map(item => {

                if (item.id === res.data.id) {
                    return res.data;
                } else {
                    return item;
                }
            })
            setPosts(newData);
            console.log("Successfully Liked!!")

        }).catch(e => {
            setError(true)
        })

    }

    const updateUnLike = (usernames, postid) => {
        axios({
            method: 'PUT',
            url: 'http://localhost:8080/api/post/update/unlike',
            data: { postId: postid, username: usernames },
            headers: authHeader()
        }).then(res => {
            const newData = posts.map(item => {

                if (item.id === res.data.id) {
                    return res.data;
                } else {
                    return item;
                }
            })
            setPosts(newData);
            console.log("Successfully UnLiked!!")

        }).catch(e => {
            setError(true)
        });
    }

    const addcommenthandler = index => (event) => {
        setCommented(event.target.value);
    }

    function uploadComment(event, postid, usernames) {
        event.preventDefault();
        setCommentMessage('Commenting...');

        if (!(commented.trim() == "")) {
            axios({
                method: 'PUT',
                url: 'http://localhost:8080/api/post/comment',
                data: { postId: postid, username: usernames, comment: commented },
                headers: authHeader()
            }).then(res => {
                const newData1 = posts.map(item => {

                    if (item.id === res.data.id) {
                        return res.data;
                    } else {
                        return item;
                    }

                })
                setCommented('');
                setPosts(newData1);
                setCommentMessage('');

            }).catch(e => {
                setCommentMessage('Error Occured...');
                setError(true)
            })
        } else {
            setCommentMessage('');
        }
    }

    const [hidden, setHidden] = useState({});
    const toggleHide = index => {
        setHidden({ ...hidden, [index]: !hidden[index] });
    };

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


    useEffect(() => {
        if (hasMore) {
            loadProducts()
        }
    }, [pageNumber])



    return (

        <div>
            <div className="flex">

                {posts.map((iteratePost, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <div>
                                <div ref={lastPostRef} key={index} class="card text-center">
                                    <div class="card-header" style={{ background: '#C6EAEA' }} >
                                        {iteratePost.userName === currentUser.username ? (
                                            <div className="justify-content-between">
                                                {!iteratePost.likersusername.some(uname => uname.username === currentUser.username) ? (
                                                    <div style={{ float: 'left' }}>

                                                        <button className="btn btn-primary btn-block buttonsize" onClick={() => updateLike(currentUser.username, iteratePost.id)}>Like</button>{'                           '}<p className="inner"><b>{iteratePost.likersusername.length} Likes</b></p>

                                                    </div>) : (<div style={{ float: 'left' }}>

                                                        <button className="btn btn-danger btn-block buttonsize" onClick={() => updateUnLike(currentUser.username, iteratePost.id)}>Unlike</button>{'                           '}<p className="inner"><b>{iteratePost.likersusername.length} Likes</b></p>

                                                    </div>)}

                                                <div style={{ float: 'right' }}><button className="btn btn-success btn-block buttonsize" onClick={() => editQuoteHandler(iteratePost.id, iteratePost.post, iteratePost.userName)}>Edit Quote</button></div>

                                                <div style={{ float: 'right' }}><button type="button" className="btn btn-danger btn-block buttonsize" onClick={() => deleteQuoteHandler(iteratePost.userName, iteratePost.id)}>Delete Quote</button></div>
                                            </div>
                                        ) : (
                                            <div className="justify-content-between">
                                                {!iteratePost.likersusername.some(uname => uname.username === currentUser.username) ? (
                                                    <div style={{ float: 'left' }}>

                                                        <button className="btn btn-primary btn-block buttonsize" onClick={() => updateLike(currentUser.username, iteratePost.id)}>Like</button>{'                           '}<p className="inner"><b>{iteratePost.likersusername.length} Likes</b></p>

                                                    </div>) : (<div style={{ float: 'left' }}>

                                                        <button className="btn btn-danger btn-block buttonsize" onClick={() => updateUnLike(currentUser.username, iteratePost.id)}>Unlike</button>{'                           '}<p className="inner"><b>{iteratePost.likersusername.length} Likes</b></p>

                                                    </div>
                                                )}
                                            </div>
                                        )

                                        }

                                    </div>
                                    <div class="card-body" style={{ background: '#fff9e5' }}>
                                        <blockquote class="blockquote">
                                            <p>{iteratePost.post}</p>
                                            <cite title="Uploader">{iteratePost.userName}</cite>
                                        </blockquote>
                                    </div>


                                    <div class="card-footer blockquote">

                                        <form>
                                            <div className="justify-content-between">
                                                <div className="form-group">
                                                    <textarea type="textarea" className="form-control" value={commented} onChange={addcommenthandler} placeholder="Enter comment..." />
                                                </div>
                                                <br></br>
                                                <div>
                                                    <button type="reset" style={{ float: 'right' }} className="btn btn-success btn-block buttonsize" onClick={(e) => uploadComment(e, iteratePost.id, currentUser.username)}>Comment</button>
                                                </div>
                                            </div>
                                        </form>
                                        <b style={{ float: 'center' }} className="text-muted p-style">{'Posted At: ' + iteratePost.postedAt.toString().replace('Z', '').replace('T', '    ')}</b>

                                        <button style={{ float: 'left' }} className="btn btn-info btn-block buttonsize" onClick={(e) => toggleHide(index)}>View all {iteratePost.comments.length} Comments</button>

                                        <table className="table table-striped table-bordered">
                                            <br></br>
                                            <tbody>
                                                {!hidden[index] &&
                                                    iteratePost.comments.sort((a, b) => a.commentedAt < b.commentedAt ? 1 : -1).slice(0, 2).map((iterateComments, Cindex) =>
                                                        <tr style={{ background: '#C4D5E7' }}>
                                                            <td>{iterateComments.username}</td>
                                                            <td>{iterateComments.comment}</td>
                                                            <td>{iterateComments.commentedAt.toString().replace('Z', '').replace('T', ' || ')}</td>

                                                        </tr>
                                                    )

                                                }
                                                {!!hidden[index] &&
                                                    iteratePost.comments.sort((a, b) => a.commentedAt < b.commentedAt ? 1 : -1).map((iterateComments, Cindex) =>
                                                        <tr style={{ background: '#C4D5E7' }}>
                                                            <td>{iterateComments.username}</td>
                                                            <td>{iterateComments.comment}</td>
                                                            <td>{iterateComments.commentedAt.toString().replace('Z', '').replace('T', ' || ')}</td>

                                                        </tr>
                                                    )

                                                }

                                            </tbody>
                                        </table> </div>
                                    <div style={{ textAlign: 'center' }}>{<div className="center"><h4><b>{commentMessage}</b></h4></div>}</div>


                                </div>
                                <br></br>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <div key={index} class="card text-center blockquote">
                                    <div class="card-header" style={{ background: '#C6EAEA' }} >
                                        {iteratePost.userName === currentUser.username ? (
                                            <div className="justify-content-between">
                                                {!iteratePost.likersusername.some(uname => uname.username === currentUser.username) ? (
                                                    <div style={{ float: 'left' }}>

                                                        <button className="btn btn-primary btn-block buttonsize" onClick={() => updateLike(currentUser.username, iteratePost.id)}>Like</button>{'                           '}<p className="inner"><b>{iteratePost.likersusername.length} Likes</b></p>

                                                    </div>) : (<div style={{ float: 'left' }}>

                                                        <button className="btn btn-danger btn-block buttonsize" onClick={() => updateUnLike(currentUser.username, iteratePost.id)}>Unlike</button>{'                           '}<p className="inner"><b>{iteratePost.likersusername.length} Likes</b></p>

                                                    </div>)}

                                                <div style={{ float: 'right' }}><button className="btn btn-success btn-block buttonsize" onClick={() => editQuoteHandler(iteratePost.id, iteratePost.post, iteratePost.userName)}>Edit Quote</button></div>

                                                <div style={{ float: 'right' }}><button type="button" className="btn btn-danger btn-block buttonsize" onClick={() => deleteQuoteHandler(iteratePost.userName, iteratePost.id)}>Delete Quote</button></div>
                                            </div>
                                        ) : (
                                            <div className="justify-content-between">
                                                {!iteratePost.likersusername.some(uname => uname.username === currentUser.username) ? (
                                                    <div style={{ float: 'left' }}>

                                                        <button className="btn btn-primary btn-block buttonsize" onClick={() => updateLike(currentUser.username, iteratePost.id)}>Like</button>{'                           '}<p className="inner"><b>{iteratePost.likersusername.length} Likes</b></p>

                                                    </div>) : (<div style={{ float: 'left' }}>

                                                        <button className="btn btn-danger btn-block buttonsize" onClick={() => updateUnLike(currentUser.username, iteratePost.id)}>Unlike</button>{'                           '}<p className="inner"><b>{iteratePost.likersusername.length} Likes</b></p>

                                                    </div>
                                                )}
                                            </div>
                                        )

                                        }

                                    </div>
                                    <div class="card-body" style={{ background: '#fff9e5' }}>
                                        <blockquote class="blockquote">
                                            <p>{iteratePost.post}</p>
                                            <cite title="Uploader">{iteratePost.userName}</cite>
                                        </blockquote>
                                    </div>


                                    <div class="card-footer blockquote">

                                        <form>
                                            <div className="justify-content-between">
                                                <div className="form-group">
                                                    <textarea type="textarea" className="form-control" value={commented} onChange={addcommenthandler(index)} placeholder="Enter comment..." />
                                                </div>
                                                <br></br>
                                                <div>
                                                    <button type="reset" style={{ float: 'right' }} className="btn btn-success btn-block buttonsize" onClick={(e) => uploadComment(e, iteratePost.id, currentUser.username)}>Comment</button>
                                                </div>
                                            </div>
                                        </form>
                                        <b style={{ float: 'center' }} className="text-muted p-style">{'Posted At: ' + iteratePost.postedAt.toString().replace('Z', '').replace('T', '    ')}</b>

                                        <button style={{ float: 'left' }} className="btn btn-info btn-block buttonsize" onClick={(e) => toggleHide(index)}>View all {iteratePost.comments.length} Comments</button>

                                        <table className="table table-striped table-bordered">
                                            <br></br>
                                            <tbody>
                                                {!hidden[index] &&
                                                    iteratePost.comments.sort((a, b) => a.commentedAt < b.commentedAt ? 1 : -1).slice(0, 2).map((iterateComments, Cindex) =>
                                                        <tr style={{ background: '#C4D5E7' }}>
                                                            <td>{iterateComments.username}</td>
                                                            <td>{iterateComments.comment}</td>
                                                            <td>{iterateComments.commentedAt.toString().replace('Z', '').replace('T', ' || ')}</td>

                                                        </tr>
                                                    )

                                                }
                                                {!!hidden[index] &&
                                                    iteratePost.comments.sort((a, b) => a.commentedAt < b.commentedAt ? 1 : -1).map((iterateComments, Cindex) =>
                                                        <tr style={{ background: '#C4D5E7' }}>
                                                            <td>{iterateComments.username}</td>
                                                            <td>{iterateComments.comment}</td>
                                                            <td>{iterateComments.commentedAt.toString().replace('Z', '').replace('T', ' || ')}</td>

                                                        </tr>
                                                    )

                                                }

                                            </tbody>
                                        </table> </div>
                                    <div style={{ textAlign: 'center' }}>{<div className="center"><h4><b>{commentMessage}</b></h4></div>}</div>


                                </div>
                                <br></br>
                            </div>
                        )
                    }
                })}
                <div style={{ textAlign: 'center' }}>{loading ? (<div className="center"><h4><b>Loading...</b></h4></div>) : (<div className="center"><h4><b>Yay! you have covered all posts!</b></h4></div>)}</div>
                <div style={{ textAlign: 'center' }}>{error && <div className="center"><h4><b>Error...</b></h4></div>}</div>
            </div>
        </div>

    )
}

export default HomeScrollComponent