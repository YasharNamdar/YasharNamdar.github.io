import {reveal, revealPageClose,selectedPassword} from "./modal.js";

export function savePassword(name, url, password, bool) {
    const passwordCard = document.createElement("div");
    passwordCard.setAttribute("class", "saved-password btn");
    passwordCard.addEventListener("click", function () {
        reveal(this);
    })
    const savedPasswordLogo = document.createElement("div");
    savedPasswordLogo.setAttribute("class", "saved-password__logo");
    const savedPasswordLogoImage = document.createElement("img");
    savedPasswordLogoImage.setAttribute(
        "src",
        "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://" +
        url +
        "&size=256"
    );
    const savedPasswordText = document.createElement("div");
    const savedPasswordPassword = document.createElement("span");
    savedPasswordPassword.setAttribute("class", "saved-password__password");
    savedPasswordPassword.innerHTML = password;
    savedPasswordText.setAttribute("class", "saved-password__text");
    savedPasswordText.innerHTML = name;
    savedPasswordLogoImage.setAttribute("class", "saved-password__logo__img");
    savedPasswordLogoImage.setAttribute("alt", name);
    passwordCard.appendChild(savedPasswordLogo);
    savedPasswordLogo.appendChild(savedPasswordLogoImage);
    passwordCard.appendChild(savedPasswordText);
    passwordCard.appendChild(savedPasswordPassword);
    document.getElementById("saved-passwords").appendChild(passwordCard);
    if (bool) {
        saveNewPassword(name, url, password);
    }
}

export function deletePassword() {
    selectedPassword.remove();
    revealPageClose();
    deleteSavedPassword(
        selectedPassword.firstElementChild.nextElementSibling.innerHTML.toString()
    );
}

export let passwordNames = [];
if (JSON.parse(localStorage.getItem("passwordNames"))) {
    passwordNames = JSON.parse(localStorage.getItem("passwordNames"));
}

export function saveNewPassword(name, url, password) {
    let info = [];
    info[0] = name;
    info[1] = url;
    info[2] = password;
    localStorage.setItem(name, JSON.stringify(info));
    passwordNames.push(name);
    localStorage.setItem("passwordNames", JSON.stringify(passwordNames));
    document.querySelector(".no-passwords").style.display = "none";
}

export function deleteSavedPassword(name) {
    localStorage.removeItem(name);
    let indexOfItem = passwordNames.indexOf("name");
    passwordNames.splice(indexOfItem, 1);
    localStorage.setItem("passwordNames", JSON.stringify(passwordNames));
    if (passwordNames.length === 0){
        document.querySelector(".no-passwords").style.display = "flex";
    }
}

export function loadPassword(n, bool) {
    savePassword(
        JSON.parse(localStorage.getItem(n))[0],
        JSON.parse(localStorage.getItem(n))[1],
        JSON.parse(localStorage.getItem(n))[2],
        bool
    );
}

export function loadPasswords() {
    if (passwordNames.length !== 0) {
        document.querySelector(".no-passwords").style.display = "none";
        for (let index = 0; index < passwordNames.length; index++) {
            let name = passwordNames[index];
            loadPassword(name, false);
        }
    }
}