import { videoList } from "../db"
import  routes  from "../routes"


export const home = (req, res) =>{
    res.render("home", {pageTitle : "Home", videoList});
};

export const search = (req, res) =>{
    const { query : { term : searchingBy }} = req;
    res.render("search", {pageTitle : "Search", searchingBy, videoList});
} 

export const videos = (req, res) =>{
    res.render("videos", {pageTitle : "Video"});
}

export const videoDetail = (req, res) =>{
    res.render("videoDetail", {pageTitle : "Video Detail"});
} 

export const editVideo = (req, res) =>{
    res.render("editVideo", {pageTitle : "Edit Video"});
} 

export const deleteVideo = (req, res) =>{
    res.render("deleteVideo", {pageTitle : "Delete Video"});
} 

export const getUploadVideo = (req, res) =>{
    res.render("uploadVideo", {pageTitle : "Upload Video"});
} 
export const postUploadVideo = (req, res) =>{
    const {
        body : {file,title,description}
    } = req;
    // To Do : Upload and save video
    res.redirect(routes.videoDetail())
};