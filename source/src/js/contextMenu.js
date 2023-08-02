let mouseLocation = [0,0]
let moveAreaY = [0,0]
let moveAreaX = [0,0]


window.addEventListener("mousemove", windowMove);
window.addEventListener("mousedown", windowClick)

function windowMove(e) {

    mouseLocation = [e.x, e.y];
    if(mouseLocation[0] < moveAreaX[0] || mouseLocation[0] > moveAreaX[1]){
        closeOptionsMenu();
    }

    if(mouseLocation[1] < moveAreaY[0] || mouseLocation[1] > moveAreaY[1]) {
        closeOptionsMenu();
    }
}

function windowClick(e) {
    if(e.x < moveAreaX[0] + 150 || e.x > moveAreaX[1]- 120){
        closeOptionsMenu()
    }
    if(e.y < moveAreaY[0]  + 150 || e.y > moveAreaY[1] - 60){
        closeOptionsMenu()
    }
}

for (const e of document.querySelectorAll(".chat-bg")) {
    e.addEventListener("contextmenu", reply)
}
for (const e of document.querySelectorAll(".reaction-option")) {
    e.addEventListener("click", reactionClick)
}
for (const e of document.querySelectorAll(".chat-reactions-box")) {
    e.addEventListener("click", chatReactionsBoxClick)
}



let chatToReact;
const reactionsBox = document.querySelector(".reactions-box");
const optionsMenu = document.querySelector(".options-menu");

let optionsMenuX, optionsMenuY;

export function reply(e) {
        e.preventDefault()
        const target = e.target
        chatToReact = e.target;
        optionsMenu.style.display = "none";
        openOptionsMenu(e.x, e.y, e.target)
    }


    function openOptionsMenu(x,y, target) {
        optionsMenu.style.display = "flex";
        const computedHeight = window.getComputedStyle(reactionsBox).height;
        let i;
        let windowHeight = "";
        let c = 0;
        i = computedHeight[c];
        i = Number(i);

        while(i != 'p'){
            i = computedHeight[c];
            if(i != 'p'){
                windowHeight = `${windowHeight}${i}`;
            }
            c++;
        }
        windowHeight = Number(windowHeight);
        if(window.innerHeight - windowHeight <= y){
            optionsMenu.style.top = `${window.innerHeight - windowHeight}px`;
            optionsMenuY = window.innerHeight - windowHeight;
            moveAreaY = [window.innerHeight - windowHeight+5-150, window.innerHeight - windowHeight+5+260]
        } else{
            optionsMenu.style.top = `${y}px`;
            optionsMenuY = y
            moveAreaY = [y+5-150 , y+5+260]
        }
        if(window.innerWidth - 200 <= x){
            optionsMenuX = window.innerWidth - 200;
            optionsMenu.style.left = `${window.innerWidth - 200}px`;
            moveAreaX = [window.innerWidth - 200+5-150 , window.innerWidth - 200+5+260]
        } else{
            optionsMenu.style.left = `${x + 5}px`;
            optionsMenuX = x+5;
            moveAreaX = [x+5-150, x+5+260];
        }


    }

     function closeOptionsMenu(){
        optionsMenu.style.display = "none";
    }

     function reactionClick(e){
        const emoji = e.target.innerText;
        if(chatToReact.children.length === 0){
            chatToReact.parentElement.children[2].innerText = emoji;
            chatToReact.parentElement.children[2].style.display = "flex";
            closeOptionsMenu()
            return;
        }
        chatToReact.children[2].innerText = emoji;
        chatToReact.children[2].style.display = "flex";
        closeOptionsMenu()
    }
   export  function chatReactionsBoxClick(e){
        e.target.innerText = "";
        e.target.style.display = "none";
}

