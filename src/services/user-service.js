import React, { Component } from 'react';
import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_URL_OTP = "http://localhost:8080/api/otp/";
const API_URL_QR = "http://localhost:8080/api/QR/";

class UserService {
    
    getPublicContent(){
        return axios.get(API_URL+ "all");
    }

    getUserContent(){
        console.log("User Details ===>" + authHeader());
        return axios.get(API_URL+ "user",{headers : authHeader()});
    }

    getAdminContent(){
        return axios.get(API_URL+ "admin",{headers : authHeader()});
    }

    getModeratorContent(){
        return axios.get(API_URL+ "mod",{headers : authHeader()});
    }

    deleteUser(id){
        return axios.delete(API_URL+ "admin/user/delete/"+id,{headers : authHeader()});
    }

    updateYourDetails(id,username,name,email,age,mobileno,password,roles){
        return axios.put(API_URL+ "user/update",{
            id, 
            username,
            name,
            email,
            age,
            mobileno,
            password,
            roles},{headers : authHeader()});
    }

    

    sendOTP(id){
        return axios.post(API_URL_OTP+"generateOTP?user_id="+id,null,{headers : authHeader()});
    }

    validateOTP(otp){
        return axios.post(API_URL_OTP+"validateOTP?enteredOtp="+otp,null,{headers : authHeader()});
    }

    getQRImage(code,width,height){
        return axios.get(API_URL_QR+"genrateQRCode/"+code+"/"+width+"/"+height,{responseType: 'arraybuffer',headers : authHeader()});
    }

    getYourDetailByUsername(username){
        return axios.get(API_URL+"user/getUser/"+username,{headers : authHeader()});
    }
    
}

export default new UserService();