import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
let btnDeleteComment


const increaseNumber = () =>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
}
const decreaseNumber = () =>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML) - 1;
}

const addComment = (comment, data) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    const button = document.createElement("button");
    button.innerHTML = "X";
    button.className = "btnDeleteComment";
    li.appendChild(span);
    li.appendChild(button);
    li.id = data;
    commentList.prepend(li);
    increaseNumber();
    addListener();
}

const addListener = () =>{
    btnDeleteComment = document.getElementsByClassName("btnDeleteComment");
    for(let i=0; i< btnDeleteComment.length; i++) {
    	btnDeleteComment[parseInt(i)].removeEventListener('click' , handleDelete)
    }
    for(let i=0; i< btnDeleteComment.length; i++) {
    	btnDeleteComment[parseInt(i)].addEventListener('click' , handleDelete)
    }
}


const sendComment = async (comment) =>{
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url : `/api/${videoId}/comment`,
        method:"POST",
        data : {
            comment
        }
    });
    console.log(response);
    if(response.status === 200){
        const {
            data
        }=response
        addComment(comment, data);
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value="";

}

const handleDelete = async (event) => {
    const id = event.path[1].id;
    const response = await axios({
        url : `/api/${id}/deleteComment`,
        method:"GET",
        data : {
            id
        }
    });
    if(response.status === 200){
        document.getElementById(id).remove();
    }
    decreaseNumber();

}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
    addListener();

}

if(addCommentForm){
    init();
}