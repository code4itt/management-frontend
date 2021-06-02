import React, { Component } from 'react';
import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/post/";

class PostService {
    
    getAllPost(){
        return axios.get(API_URL+ "all?page=1",{headers : authHeader()});
    }

    getPostByUsername(username){
        return axios.get(API_URL+ "user?username="+username+"&page=1",{headers : authHeader()});
    }

    getPostByPostId(postId){
        return axios.get(API_URL+ postId,{headers : authHeader()});
    }

    deletePost(username,postId){
        return axios.delete(API_URL+ "delete/"+postId+"?username="+username,{headers : authHeader()});
    }

    updatePost(id,post,userName){
        return axios.put(API_URL+ "update",{
            id,
            post,
            userName},{headers : authHeader()});
    }

    uploadPost(post,userName){
        return axios.post(API_URL+ "upload",{
            post,
            userName},{headers : authHeader()});
    }
}

export default new PostService();