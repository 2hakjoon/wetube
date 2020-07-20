import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : "Text is required"
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const model = mongoose.model("Commnet", CommentSchema);
export default model;