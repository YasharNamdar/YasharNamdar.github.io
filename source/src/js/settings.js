
export const pageDenier = document.querySelector("#page-denier");
export const settingsPage = document.querySelector("#settings-page");
const rootElement = document.querySelector(":root");
const darkModeOn = document.querySelector(".darkmode-on");
const darkModeOff = document.querySelector(".darkmode-off");
let darkMode = true;

document.querySelector(".left-bar-option.settings").addEventListener("click", openSettingsPage);
document.querySelector(".settings-page-option.save").addEventListener("click", saveSettings);
document.querySelector(".settings-page-option.cancel").addEventListener("click", cancelSettings);
document.querySelector(".darkmode").addEventListener("click", toggleDarkMode);
document.querySelector(".theme-color-1").addEventListener("click", callColorPicker);
document.querySelector(".theme-color-2").addEventListener("click", callColorPicker);
pageDenier.addEventListener("click", closeCurrentModal)

export function closeCurrentModal() {
    if(colorPickerBox.style.display === "flex"){
        colorPickerBox.style.display = "none";
        pageDenier.style.zIndex = "2";
    }
    else if(settingsPage.style.display === "flex"){
        closeSettingsPage()
    }
}

export function openSettingsPage() {
    settingsPage.style.display = "flex";
    pageDenier.style.display = "block";
}

export function closeSettingsPage() {
    settingsPage.style.display = "none";
    pageDenier.style.display = "none";
}


function saveSettings() {
    const theme1 = document.querySelector("#preview-theme-color-1").style.backgroundColor;
    const theme2 = document.querySelector("#preview-theme-color-2").style.backgroundColor;
    rootElement.style.setProperty("--theme-1", theme1);
    rootElement.style.setProperty("--theme-2", theme2);
    closeSettingsPage()
}

function cancelSettings() {
    closeSettingsPage()
}

function toggleDarkMode() {
    if (darkMode === true){
        darkMode = false;
        darkModeOn.style.display = "none";
        darkModeOff.style.display = "flex";
        for (const e of document.querySelectorAll("input, input::placeholder, .c-input, button, span, .user-username")) {
            e.style.color = "#1c1c1c";
        }
        rootElement.style.setProperty("--main-color", "rgba(206, 206, 206, 0.6)");
        rootElement.style.setProperty("--main-color-full", "rgb(206, 206, 206)");
        rootElement.style.setProperty("--scrollbar-color", "#7c7c7c");
        rootElement.style.setProperty("--main-page-bg", "#1c1c1c");
        rootElement.style.setProperty("--text-color", "#1c1c1c");
        rootElement.style.setProperty("--main-border", "rgba(0, 0, 0, 0.35)")

    }else {
        darkMode = true;
        darkModeOn.style.display = "flex";
        darkModeOff.style.display = "none";
        rootElement.style.setProperty("--main-page-bg", "#1c1c1c");
        for (const e of document.querySelectorAll("input, input::placeholder, .c-input, button, span, .user-username")) {
            e.style.color = "rgb(241, 241, 241)";
        }
        rootElement.style.setProperty("--text-color", "rgb(241, 241, 241)");
        rootElement.style.setProperty("--scrollbar-color", "#2d2d2d");
        rootElement.style.setProperty("--main-color-full", "rgb(31, 31, 31)");
        rootElement.style.setProperty("--main-color", "rgba(31, 31, 31, 0.6)");
        rootElement.style.setProperty("--main-border", "rgba(255, 255, 255, 0.15)")
    }
}


export const colorPickerBox = document.querySelector(".colorpicker-box");
export const colorPicker = document.querySelector(".colorpicker");
export const colorPickerRange = document.querySelector(".colorpicker-range");
export const colorPickerCursor = document.querySelector(".colorpicker-cursor");
let foundRed, foundGreen, foundBlue, foundSliderColor;
let foundEndColor = [];

let targetTheme = "111";

foundSliderColor = [255, 0, 0];

firstCreatePixels()

colorPickerRange.addEventListener("change", updateRGB);
colorPicker.addEventListener("mousedown", colorPickerClicked)
colorPicker.addEventListener("mousemove", cursorDrag)

export function callColorPicker(e) {

    if(e.target.firstElementChild != null){
        targetTheme = e.target.firstElementChild.nextElementSibling
    } else{
        targetTheme = e.target
    }
    colorPickerBox.style.left = `${e.x}px`;
    colorPickerBox.style.top = `${e.y}px`;
    colorPickerBox.style.display="flex";
    pageDenier.style.zIndex = "4";
}

function findSliderRGB(value) {
    if(value <= 255) {
        foundRed = 255;
        foundGreen = value;
        foundBlue = 0;
    } else if(value > 255 && value <= 510) {
        foundRed = 510 - value;
        foundGreen = 255;
        foundBlue = 0;
    } else if(value > 510 && value <= 765) {
        foundRed = 0;
        foundGreen = 255;
        foundBlue = value - 510;
    } else if(value > 765 && value <= 1020) {
        foundRed = 0;
        foundGreen = 1020 - value;
        foundBlue = 255;
    } else if(value > 1020 && value <= 1275) {
        foundRed = value - 1020;
        foundGreen = 0;
        foundBlue = 255;
    } else if(value > 1275  && value <= 1530) {
        foundRed = 255;
        foundGreen = 0;
        foundBlue = 1530 - value;
    }
    return [foundRed, foundGreen, foundBlue];
}

function updateRGB(){
    foundSliderColor = findSliderRGB(colorPickerRange.value);
    const foundColor = [foundSliderColor[0], foundSliderColor[1], foundSliderColor[2]];
    createPixels(foundColor);
    //colorPicker.style.background = `   rgb(${foundSliderColor[0]}, ${foundSliderColor[1]}, ${foundSliderColor[2]})`
}

function findEndColor(c, curCol) {
    const red = curCol[0];
    const green = curCol[1];
    const blue = curCol[2];
    foundEndColor[0] = red - c*(red/255);
    foundEndColor[1] = green - c*(green/255);
    foundEndColor[2] = blue - c*(blue/255);
}

export function firstCreatePixels() {
    for (let c = 1; c < 256; c++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("id", `c${c}`);
        pixel.setAttribute("class", `colorpicker-pixel`);
        colorPicker.appendChild(pixel);
        findEndColor(c, [255, 0, 0]);
        pixel.style.background = `linear-gradient(90deg, rgb(${256 - c}, ${256 - c}, ${256 - c}), rgb(${foundEndColor[0]}, ${foundEndColor[1]}, ${foundEndColor[2]}))`;
    }
}

function createPixels(color) {
    for (let c = 1; c < 256; c++) {
        findEndColor(c, color);
        document.getElementById(`c${c}`).style.background = `linear-gradient(90deg, rgb(${256 - c}, ${256 - c}, ${256 - c}), rgb(${foundEndColor[0]}, ${foundEndColor[1]}, ${foundEndColor[2]}))`;
    }
}

function colorPickerClicked(e) {
    colorPickerCursor.style.left = `calc(${e.layerX}px - 0.375rem)`;
    colorPickerCursor.style.top = `calc(${e.layerY}px - 0.375rem)`;
}

function calculateFinalColor(x,c, e) {
    const sliderColor = foundSliderColor;
    let y = 151 - c + 15;
    x = x - 17;
    findEndColor((255/150) * (150 - y), sliderColor);
    let red = foundEndColor[0];
    let green = foundEndColor[1];
    let blue = foundEndColor[2];
    const endRowColor = [256 - y, 256 - y, 256 - y];
    const foundFinalColor = [((((250 - x)/250) * (((250/150) * y) - red)) + red), ((((250 - x)/250) * (((250/150) * y) - green)) + green), ((((250 - x)/250) * (((250/150) * y) - blue)) + blue)];
    targetTheme.style.backgroundColor = `rgb( ${foundFinalColor[0]}, ${foundFinalColor[1]}, ${foundFinalColor[2]})`
}

function cursorDrag(e) {
    if(e.buttons === 1){
        colorPickerCursor.style.left = `calc(${e.layerX}px - 0.375rem)`;
        colorPickerCursor.style.top = `calc(${e.layerY}px - 0.375rem)`;
        calculateFinalColor(e.layerX, e.layerY, e);
    }

}