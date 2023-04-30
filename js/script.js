
const APP_ID = "c3c455fc548841c3a9c19a1826d2d2ac";
const TOKEN = "007eJxTYJj350a81qSoD7ar2/iSM2U69znN50qV7lQSKmlLcnvF7a3AkGycbGJqmpZsamJhYWKYbJxomWxomWhoYWSWYpRilJhcv8kvpSGQkeHV5yMsjAwQCOKzMOQmZuYxMAAA0dseYw==";
const CHANNEL = "main";

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'});

let localTracks = [];
let remoteUsers = {};

const buttons = document.querySelectorAll('.mdc-button');
for (const button of buttons) {
    mdc.ripple.MDCRipple.attachTo(button);
}



let joinAndDisplayLocalStream = async  () =>{

    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft)

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, document.querySelector(".user-name").value)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="user-container" id="user-container-${UID}">
                       <div class="user-player" id="user-${UID}">You</div>
                    </div>`;
    document.getElementById('streams').insertAdjacentHTML('beforeend',player);
    document.querySelector(".mic-btn").style.display = "flex";
    document.querySelector(".leave-btn").style.display = "flex";

    await client.publish([localTracks[0]]);
}

let joinStream = async  () =>{
    if(document.querySelector(".user-name").value !== ""){
        await joinAndDisplayLocalStream();
        document.querySelector('.join-btn').style.display = 'none';
        document.querySelector('.user-name').style.display = 'none';
    }

}

let handleUserJoined = async( user, mediaType) => {
    remoteUsers[user.uid] = user;
    await client.subscribe(user, mediaType);

    if(mediaType === "audio"){

        const randomColor = [((Math.trunc(Math.random()*255)) + 1), ((Math.trunc(Math.random()*255)) + 1), ((Math.trunc(Math.random()*255)) + 1)]
        const randomColorRGB = `rgb(${randomColor[0]} ${randomColor[1]}, ${randomColor[2]})`;
        const secondRandomColorRGB = `rgb(${randomColor[0]+50} ${randomColor[1]+50}, ${randomColor[2]+50})`;

        player = `<div class="user-container" style="border-color: ${randomColorRGB}; background:linear-gradient(45deg, ${randomColorRGB} 0%, ${secondRandomColorRGB} 100%)!important;" id="user-container-${user.uid}">
                       <div class="user-player" id="user-${user.uid}">${user.uid}</div>
                    </div>`;
        document.getElementById('streams').insertAdjacentHTML('beforeend',player);


        user.audioTrack.play();

    }
}

let handleUserLeft = async (user) => {
    document.querySelector(`#user-container-${user.uid}`).remove();
    delete remoteUsers[user.uid];
}

let leaveAndRemoveLocalStream = async () => {
    for(const track of localTracks){
        track.stop();
        track.close();
    }

    await client.leave()
    document.querySelector('.join-btn').style.display = 'flex';
    document.querySelector('.user-name').style.display = 'block';
    document.querySelector("#streams").innerHTML = "";
}

let toggleMic = async (e) => {

    if (localTracks[0].muted){
        await localTracks[0].setMuted(false);
        e.target.innerText = "Mic On";
    }else{
        await localTracks[0].setMuted(true);
        e.target.innerText = "Mic Off";

    }

}

document.querySelector('.join-btn').addEventListener("click", joinStream)
document.querySelector('.leave-btn').addEventListener("click", leaveAndRemoveLocalStream)
document.querySelector(".mic-btn").addEventListener("click", toggleMic)
