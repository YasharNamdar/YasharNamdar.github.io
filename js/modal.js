import * as passwordManager from "./passwordManager.js";

export function savePageReveal() {
    document.querySelector(".container").style.filter = "blur(5px)";
    document.querySelector(".page-denier").style.display = "block";
    document.querySelector(".sidebar").style.pointerEvents = "none";
    document.querySelector(".page-save").style.display = "flex";
    if (
        document.querySelector(".results__password").innerHTML !== "" &&
        document.querySelector(".results__password").innerHTML !==
        "Select at least one option."
    ) {
        document.querySelector(".save-input-password").value = document
            .querySelector(".results__password")
            .innerText;
    }
}

export function savePageCancel() {
    document.querySelector(".container").style.filter = "none";
    document.querySelector(".page-denier").style.display = "none";
    document.querySelector(".sidebar").style.pointerEvents = "auto";
    document.querySelector(".page-save").style.display = "none";
    document.querySelector(".save-input-name").style.borderColor = "#047857";
    document.querySelector(".save-input-name").style.color = "black";
    document.querySelector(".save-input-name")
        .setAttribute("placeholder", "Name");
    for (const element of document.querySelectorAll(".save-input")) {
        element.value = "";
    }
}

export function savePageConfirm() {
    if (document.querySelector(".save-input-name").value === "") {
        document.querySelector(".save-input-name").classList.add("i-input-warning")
        return;
    }
    if (
        passwordManager.passwordNames.includes(
            document.querySelector(".save-input-name").value
        )
    ) {
        document
            .querySelector(".save-input-name")
            .setAttribute("placeholder", "Name Already Exists");
        document.querySelector(".save-input-name").value = "";
        return;
    }
    document
        .querySelector(".save-input-name")
        .setAttribute("placeholder", "Name");
    passwordManager.savePassword(
        document.querySelector(".save-input-name").value,
        document.querySelector(".save-input-url").value,
        document.querySelector(".save-input-password").value,
        true
    );
    document.querySelector(".container").style.filter = "none";
    document.querySelector(".page-denier").style.display = "none";
    document.querySelector(".sidebar").style.pointerEvents = "auto";
    document.querySelector(".page-save").style.display = "none";
    document.querySelector(".save-input-name").classList.remove("i-input-warning")
    document.querySelector(".save-input-name").style.color = "black";
    for (const element of document.querySelectorAll(".save-input")) {
        element.value = "";
    }
}

export let selectedPassword = undefined;
export function reveal(element) {
    document.querySelector(".container").style.filter = "blur(5px)";
    document.querySelector(".page-denier").style.display = "flex";
    document.querySelector(".sidebar").style.pointerEvents = "none";
    document.querySelector(".page-reveal").style.display = "flex";
    document.querySelector(".page-reveal-password").innerText =
        element.lastElementChild.innerText;
    selectedPassword = element;
}

export function revealPageClose() {
    document.querySelector(".container").style.filter = "none";
    document.querySelector(".page-denier").style.display = "none";
    document.querySelector(".sidebar").style.pointerEvents = "auto";
    document.querySelector(".page-reveal").style.display = "none";
}

export function copyPassword() {
    navigator.clipboard.writeText(selectedPassword.lastElementChild.innerHTML);
}
