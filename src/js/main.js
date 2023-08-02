import AC from 'agora-chat';
import {receiveMessage} from "./message.js";
import {loginSuccess,userToken ,loginFailed} from "./login.js";

let conn;
const defaultUserId = "test1";
const defaultToken = "007eJxTYLj647L+HqG7/JFnD6lcz3Vl4tAVWudfMckwo6ixwivyTr8CQ3KqUZpJanJaUrKpkYlhqnGSRWKaZaJxSrJFiomFoaVJDd+plIZARob1LqsZGBlYgZiRAcRXYTAwTDJJSrYw0DU2NEjUNTRMTdW1NDEx0k02tUwzS0w2SU1KTQYAPqknLQ==";
const defaultChatRoomId = "221842324389889";

export function ACLogin(userId, token, chatroomId) {
    conn = new AC.connection({
        appKey: '71947963#1179086',
    });


    conn.addEventHandler("connection&message", {
        onConnected: () => {
            loginSuccess()
        },
        onDisconnected: () => {
            console.log("Logged out!");
        },
        onTextMessage: (message) => {
            receiveMessage(message.msg, message.from, message.time, message.id)
        },
        onTokenWillExpire: (params) => {
            console.log("Token is about to expire");
        },
        onTokenExpired: (params) => {
            console.log("The token has expired");
        },
        onError: (error) => {
            loginFailed();
        },
    });

    conn.open({
        user: userId,
        agoraToken: token,

    }).then(() => {
        joinChatRoom(chatroomId)
    })

    function joinChatRoom(id) {
        conn
            .joinChatRoom({ roomId: id })
            .then((res) => {
                if (res.data.result === true) {
                    console.log("joined chat room");
                }
            })
            .catch((c) => {
                loginFailed()
            });
    }


}

export function ACClose() {
    conn.close();
}

export function sendMessageBE(text, userId, chatroomId) {
    //send message
        let option = {
        chatType: "chatRoom", // Sets the chat type as single chat.
        type: "txt", // Sets the message type.
        from: userId, // Sets the recipient of the message with user ID.
        msg: text, // Sets the message content.
        to: chatroomId,
    };
    let msg = AC.message.create(option);
    conn
        .send(msg)
        .then((res) => {
            console.log("send text success");
        })
        .catch((c) => {
            console.log("send private text fail");
            console.log(c);
        });
    console.log(chatroomId);
}

function receiveMessageBE() {

}