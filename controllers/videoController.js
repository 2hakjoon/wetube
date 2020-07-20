
import  routes  from "../routes"
import Video from "../models/Video"


export const home = async(req, res) =>{
    try {
        const videoList = await Video.find({}).sort({_id:-1});
        res.render("home", { pageTitle: "Home", videoList });
      } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videoList });
      }
    };

export const search = async(req, res) =>{
    const { 
        query : { term : searchingBy }
    } = req;
    let videoList = [];
    try{
        videoList = await Video.find({
            title : {$regex : searchingBy, $options: "i"}
        });
    }
    catch(error){
        console.log(error);
        
    }
    res.render("search", {pageTitle : "Search", searchingBy, videoList});
} 

export const videoDetail = async(req, res) =>{
    const {
        params : {id}
    }=req;
    try{
        const video = await Video.findById(id);
        res.render("videoDetail", {pageTitle : `Edit ${video.title}`, videoList : video});
    }catch(error){
        res.redirect(routes.home);
    }
} 

export const getEditVideo = async (req, res) =>{
    const {
        params :{id} 
    }= req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle : `Edit ${video.title}`, video});
    }catch(error){
        res.redirect(routes.home);
    }
} 

export const postEditVideo = async(req, res) => {
    const {
        params :{id},
        body : {title, description}
    }= req;
    try{
        await Video.findOneAndUpdate({_id : id}, {title, description});
        res.redirect(routes.videoDetail(id))
    }catch (error){
        res.redirect(routes.home);
    }
}

export const deleteVideo = async(req, res) =>{
    const {
        params:{id}
    }= req;
    try{
        await Video.findOneAndRemove({_id:id});
    }
    catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
} 

export const getUploadVideo = (req, res) =>{
    res.render("uploadVideo", {pageTitle : "Upload Video"});
} 
export const postUploadVideo = async(req, res) =>{
    const {
        body : {title,description},
        file : { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl:path,
        title,
        description
    })
    console.log(newVideo)
    // To Do : Upload and save video
    res.redirect(routes.videoDetail(newVideo.id))
};