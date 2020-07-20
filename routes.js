import { userDetail } from "./controllers/userController";

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
const CHANGE_PASSWORD = "/users/change-password";

//Videos
const VIDEOS = "/videos";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const UPLOAD_VIDEO = "/uploadVideo";
const DELETE_VIDEO = "/:id/delete";

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
}

export default routes;