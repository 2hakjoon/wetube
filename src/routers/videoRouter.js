import express from "express";
import routes from "../routes";
import { videos, 
    videoDetail, 
    deleteVideo, 
    getUploadVideo, 
    postUploadVideo, 
    getEditVideo, 
    postEditVideo, 
} from "../controllers/videoController";
import { multerUploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

//upload
videoRouter.get(routes.uploadVideo, onlyPrivate, getUploadVideo) 
videoRouter.post(routes.uploadVideo, onlyPrivate, multerUploadVideo, postUploadVideo)

//Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo)
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo)

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail)

//delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo)



export default videoRouter;
