import React, { Component } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";
const API_URL_FACEBOOK = "http://localhost:8080/api/auth/facebook/login/";

class AuthService{

    login(username,password){
        return axios
       .post(API_URL+ "signin", {
            username , password
       })
       .then(res => {
           if(res.data.accessToken){
               localStorage.setItem("user", JSON.stringify(res.data))
               localStorage.setItem("isLoggedIn", true)
           }

           return res.data;
       })
    }

    logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
    }

    register(username,name,email,age,mobileno,password){
        return axios.post(API_URL+"signup",
       { username,
       name,
       email,
       age,
       mobileno,
       password});
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }

    facebookLogin(username,name,email,age,mobileno,password,dob){
        return axios.post(API_URL_FACEBOOK+"?dob="+dob,{username,
            name,
            email,
            age,
            mobileno,
            password})
            .then( res => {
                if(res.data.accessToken){
                    localStorage.setItem("user", JSON.stringify(res.data))
                }
     
                return res.data;
            });
    }
    
}

export default new AuthService();