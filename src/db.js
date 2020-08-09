import mongoos from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoos.connect(
    process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL{
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const db = mongoos.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log(`X Error on DB Connection:${error}`)

db.once("open", handleOpen);
db.on("error", handleError);