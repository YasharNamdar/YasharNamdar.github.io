function setSidebarOff() {
    document
        .querySelector(".sidebar-item1")
        .classList.remove("selected");
    document
        .querySelector(".sidebar-item2")
        .classList.remove("selected");
    document
        .querySelector(".sidebar-item3")
        .classList.remove("selected");
}

export function setSidebarOn(element) {
    setSidebarOff();
    element.classList.add("selected");
    if (element.classList[2] === "sidebar-item1") {
        document.querySelector(".page1").style.display = "flex";
        document.querySelector(".page2").style.display = "none";
    } else if (element.classList[3] === "sidebar-item2") {
        document.querySelector(".page2").style.display = "flex";
        document.querySelector(".page1").style.display = "none";
    }
}