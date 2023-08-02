import {chatReactionsBoxClick, reply} from "./contextMenu.js";
import {sendMessageBE} from "./main.js";
import {loginUserName, chatroomId} from "./login.js";

document.querySelector("#send").addEventListener("click", sendMessage)

const typeArea = document.querySelector("#type-area");
const chatBox = document.querySelector("#chat-box");


typeArea.addEventListener("keydown", typeAreaKeyDown)
function sendMessage(e) {
    if(e){
        e.preventDefault();
    }
    if(typeArea.value){
        const chatBG = document.createElement("div");
        chatBG.setAttribute("class", "chat-bg background your-chat");
        const chatWrapper = document.createElement("div");
        const chatText = document.createElement("span");
        const chatFooter = document.createElement("div");
        let chatIcon = document.createElement("ion-icon");
        const chatTime = document.createElement("span");
        chatTime.setAttribute("class", "chat-time");
        const now = new Date();
        chatTime.innerText = `${now.getHours()}:${now.getMinutes()}`;
        chatIcon.setAttribute("name", "checkmark-outline");
        chatFooter.setAttribute("class", "chat-footer");
        chatText.setAttribute("class", "chat-text");
        chatText.innerText = typeArea.value;
        chatWrapper.setAttribute("class", "chat glass your-chat");
        const chatReactionsBox = document.createElement("div");
        chatReactionsBox.setAttribute("class", "chat-reactions-box glass c-input");
        chatFooter.appendChild(chatIcon);
        chatFooter.appendChild(chatTime);
        chatWrapper.appendChild(chatText);
        chatWrapper.appendChild(chatFooter);
        chatWrapper.appendChild(chatReactionsBox);
        chatBG.appendChild(chatWrapper);
        chatBG.addEventListener("contextmenu", reply);
        chatBox.appendChild(chatBG);
        chatReactionsBox.addEventListener("click", chatReactionsBoxClick);
        const messageText = typeArea.value.toString();
        typeArea.value = "";
        sendMessageBE(messageText, loginUserName.value.toString(), chatroomId.toString());
    }

}



function typeAreaKeyDown(e) {
    if(e.key === "Enter" && e.shiftKey === false){
        e.preventDefault();
        sendMessage();
    }

}

export function receiveMessage(text, user, time, id) {
    const chatBG = document.createElement("div");
    chatBG.setAttribute("class", "chat-bg background other-chat");
    const chatWrapper = document.createElement("div");
    const chatText = document.createElement("span");
    const chatFooter = document.createElement("div");
    let chatIcon = document.createElement("ion-icon");
    const chatTime = document.createElement("span");
    chatTime.setAttribute("class", "chat-time");
    const now = new Date();
    chatTime.innerText = `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
    chatIcon.setAttribute("name", "checkmark-outline");
    chatFooter.setAttribute("class", "chat-footer");
    chatText.setAttribute("class", "chat-text");
    chatText.innerText = text;
    chatWrapper.setAttribute("class", "chat glass other-chat");
    const chatReactionsBox = document.createElement("div");
    chatReactionsBox.setAttribute("class", "chat-reactions-box glass c-input");
    chatFooter.appendChild(chatIcon);
    chatFooter.appendChild(chatTime);
    chatWrapper.appendChild(chatText);
    chatWrapper.appendChild(chatFooter);
    chatWrapper.appendChild(chatReactionsBox);
    chatBG.appendChild(chatWrapper);
    chatBG.addEventListener("contextmenu", reply);
    chatBox.appendChild(chatBG);
    chatBG.setAttribute("id", id);
    chatReactionsBox.addEventListener("click", chatReactionsBoxClick);
}
