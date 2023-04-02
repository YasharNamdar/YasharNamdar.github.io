let darkMode = localStorage.darkMode;
darkMode = darkMode !== "true";

export function setDarkModeOn() {
    if (darkMode) {
        document.querySelector("body").classList.remove("darkmode")
        for (const item of document.querySelectorAll("span")) {
            item.classList.remove("darkmode")
        }
        darkMode = false;
        localStorage.setItem("darkMode", "false");
    }
    else {
        document.querySelector("body").classList.add("darkmode")
        for (const item of document.querySelectorAll("span")) {
            item.classList.add("darkmode")
        }
        darkMode = true;
        localStorage.setItem("darkMode", "true");
    }
}