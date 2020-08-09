import { METHODS } from "http";

const { join } = require("path");

//Global
const Home = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//Videos
const VIDEOS = "/videos";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const UPLOAD_VIDEO = "/uploadVideo";
const DELETE_VIDEO = "/:id/delete";

//Github

const GITHUB_LOGIN = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback"

//FACEBOOK 
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

//API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/deleteComment";


const routes = {
    home : Home,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    users : USERS,
    userDetail : id => {
        if(id) {
            return `/users/${id}`;
        }
        else {
            return USER_DETAIL;
        }
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos : VIDEOS,
    videoDetail :id => {
        if(id) {
            return `/videos/${id}`;
        }
        else {
            return VIDEO_DETAIL;
        }
    },
    editVideo : id => {
        if(id){
            return `/videos/${id}/edit`;
        }else{
            return EDIT_VIDEO;
        }
    },
    deleteVideo : (id) => {
        if(id){
            return `/videos/${id}/delete`
        }else {
            return DELETE_VIDEO
        }
    },
    uploadVideo : UPLOAD_VIDEO,

    githubLogin : GITHUB_LOGIN,
    githubCallback : GITHUB_CALLBACK,
    me: ME,
    facebook : FB,
    facebookCallback : FB_CALLBACK,
    api : API,
    registerView : REGISTER_VIEW,
    addComment : ADD_COMMENT,
    deleteComment : DELETE_COMMENT,
}

export default routes;