import {lengthText} from "./translate.js";

export let symbolsCheckValue = false;
export let numbersCheckValue = true;
export let ambiguousCheckValue = false;
export let lowercaseCheckValue = false;
export let uppercaseCheckValue = false;
export let similarCheckValue = false;
export function changeLengthValue() {
    const lengthSliderText = document.querySelector(
        ".options-length__text"
    );
    const sliderValue = document.querySelector(".length-slider");
    lengthSliderText.innerText = lengthText + sliderValue.value;
}

export function symbolsCheck() {
    symbolsCheckValue = !symbolsCheckValue;
}
export function numbersCheck() {
    numbersCheckValue = !numbersCheckValue;
}
export function ambiguousCheck() {
    ambiguousCheckValue = !ambiguousCheckValue;
}
export function lowercaseCheck() {
    lowercaseCheckValue = !lowercaseCheckValue;
}
export function uppercaseCheck() {
    uppercaseCheckValue = !uppercaseCheckValue;
}
export function similarCheck() {
    similarCheckValue = !similarCheckValue;
}
export function copyGeneratedPassword() {
    const passwordText = document.querySelector(".results__password");
    if (
        passwordText.innerHTML !== "" &&
        passwordText.innerHTML !== "Select at least one option."
    ) {
        navigator.clipboard.writeText(passwordText.innerHTML);
    }
}

