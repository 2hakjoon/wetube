import express from "express";
import routes from "../routes";
import { videos, upload, videoDetail, editVideo, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.videos, videos)
videoRouter.get(routes.videoDetail, upload)
videoRouter.get(routes.editVideo, videoDetail)
videoRouter.get(routes.deleteVideo, editVideo)
videoRouter.get(routes.deleteVideo, deleteVideo)



export default videoRouter;
