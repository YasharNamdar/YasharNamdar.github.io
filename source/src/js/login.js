import {ACClose, ACLogin} from "./main.js";

const loginPage = document.querySelector("#login-page");
const loginBox = document.querySelector("#login-box");
const userPP = document.querySelector(".user-image.this-user");
let userPPsrc = "";

export const loginUserName = document.querySelector("#login-input-username");
const userName = document.querySelector(".user-username.this-user");
const mainPage = document.querySelector("#main-page");
const mainBox = document.querySelector("#main-box");
export let userId, userToken, chatroomId;

document.querySelector("#login-button").addEventListener("click", login);
document.querySelector(".left-bar-option.exit").addEventListener("click", exit);

function test(e){
    e.preventDefault()
    console.log("test");
}

function login(e) {
    e.preventDefault();

    if (loginUserName.value !== "") {
        userName.innerText = loginUserName.value;
    }
    if(document.querySelector("#login-input-username").value && document.querySelector("#login-input-token").value && document.querySelector("#login-input-chatroom").value)
    {
        userId = loginUserName.value.toString();
        userToken = document.querySelector("#login-input-token").value.toString();
        chatroomId = document.querySelector("#login-input-chatroom").value.toString();
        ACLogin(userId, userToken, chatroomId)
    }
}

export function loginSuccess() {
    loginPage.style.display = "none";
    mainPage.style.display = "flex";
    document.querySelector("#login-button").firstElementChild.innerText = "Enter";
}

function exit() {
    loginPage.style.display = "flex";
    mainPage.style.display = "none";
    ACClose();
}

export function loginFailed() {
    loginPage.style.display = "flex";
    mainPage.style.display = "none";
    document.querySelector("#login-button").firstElementChild.innerText = "Login Failed";
}

const loginPP = document.querySelector("#login-input-pp");
const preview = document.querySelector("#login-user-image");
const previewImg = document.querySelector("#login-user-img");
loginPP.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const curFiles = loginPP.files;

    if( curFiles.length === 1) {
        loginPP.style.backgroundColor = "unset";
        preview.style.backgroundImage = `url("${URL.createObjectURL(curFiles[0])}")`
        userPP.style.backgroundColor = "unset";
        userPP.style.backgroundImage = `url("${URL.createObjectURL(curFiles[0])}")`;
        userPPsrc = `url("${URL.createObjectURL(curFiles[0])}")`;
    }
}