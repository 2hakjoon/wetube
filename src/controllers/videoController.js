import  routes  from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";


export const home = async(req, res) =>{
    try {
        const videoList = await Video.find({}).sort({_id:-1});
        res.render("home", { pageTitle: "Home", videoList });
    } 
    catch (error) {
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
        const video = await Video.findById(id).populate('creator').populate('comments');
        console.log(video);
        res.render("videoDetail", {pageTitle : `Edit ${video.title}`, video});
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
} 

export const getEditVideo = async(req, res) =>{
    const {
        params : {id} 
    } = req;
    try{
        
        const video = await Video.findById(id);
        console.log((String(video.creator)), (req.user.id));
        if(String(video.creator._id) !== req.user.id){
            console.log("OK")
            //throw Error();
        }
        else{
            res.render("editVideo", {pageTitle : `Edit ${video.title}`, video});
        }
    }catch(error){
        console.log(error);
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
        const video = await Video.findById(id);
        if(String(video.creator._id) !== req.user.id){
            throw Error();
        }
        else{
            await Video.findOneAndRemove({_id:id});
        }
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
        file : { location }
    } = req;
    console.log(req.file);
    const newVideo = await Video.create({
        fileUrl:location,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id))
};

//Register Video View

export const postregisterView = async(req, res) =>{
    const {
        params : {id}
    } = req;
    try{
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
    finally{
        res.end();
    }
}


//Add Comment
export const postAddComment = async(req, res) => {
    const {
        params : { id },
        body : { comment },
        user
    } = req;
    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text : comment,
            creator : user.id
        });
        video.comments.push(newComment._id);
        video.save();
        //console.log(video.comments);
        res.send(newComment._id);
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
    finally{
        res.end();
    }
}

export const getDeleteComment = async (req, res) =>{
    const {
        params : { id }
    } = req;
    console.log(id);
    try{
        await Comment.findOneAndRemove({_id:id});
        res.status(200);
        res.end();
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
}