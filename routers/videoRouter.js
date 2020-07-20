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
import { multerUploadVideo } from "../middlewares";

const videoRouter = express.Router();

//upload
videoRouter.get(routes.uploadVideo, getUploadVideo) 
videoRouter.post(routes.uploadVideo, multerUploadVideo, postUploadVideo)

//Edit Video
videoRouter.get(routes.editVideo(), getEditVideo)
videoRouter.post(routes.editVideo(), postEditVideo)

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail)

//delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo)



export default videoRouter;
