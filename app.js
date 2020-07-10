import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";


const app = express();

//미들웨어로써 현재 전역으로 선언되어 있어 모든 route에 접근 할 때, 먼저 실행함. 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(morgan("dev"));
app.use(helmet());


app.use(routes.home , globalRouter);
app.use(routes.users , userRouter);
app.use(routes.videos , videoRouter);

export default app;