import {numbersCheckValue, symbolsCheckValue, ambiguousCheckValue, lowercaseCheckValue, similarCheckValue, uppercaseCheckValue} from "./options.js";
import {currentLanguage, oneOptionText} from "./translate.js";
export function generatePassword() {
    const numbers = "23456789";
    const symbols = "!@#$%^&*()";
    const ambiguous = '>,.?-_=+[]{}/\\"';
    const lowercase = "abcdefghijklmnpqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
    const similar = "iI1L0oOcC";
    let selectedChars = "";
    let password = "";

    if (symbolsCheckValue === true) selectedChars += symbols;
    if (numbersCheckValue === true) selectedChars += numbers;
    if (ambiguousCheckValue === true) selectedChars += ambiguous;
    if (lowercaseCheckValue === true) selectedChars += lowercase;
    if (uppercaseCheckValue === true) selectedChars += uppercase;
    if (similarCheckValue === true) selectedChars += similar;


    const sliderValue = document.querySelector(".length-slider");
    const passwordLength = sliderValue.value;

    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * selectedChars.length);
        password += selectedChars[randomIndex];
    }

    const passwordResult = document.querySelector(".results__password");
    if (
        symbolsCheckValue === false &&
        numbersCheckValue === false &&
        ambiguousCheckValue === false &&
        lowercaseCheckValue === false &&
        uppercaseCheckValue === false &&
        similarCheckValue === false
    ) {
        passwordResult.classList.remove("persian")
        passwordResult.classList.add(currentLanguage);
        passwordResult.innerHTML = oneOptionText;

        return;
    }
    passwordResult.classList.remove(currentLanguage);
    passwordResult.innerHTML = password;
    let score = zxcvbn(password);
    let strengthWidth = (score.score + 1) * 20;
    let strengthResult = document.querySelector(".strength");
    strengthResult.style.width = strengthWidth.toString() + "%";
    switch (strengthWidth) {
        case 20:
            strengthResult.style.backgroundColor = "#dc2626";
            break;
        case 40:
            strengthResult.style.backgroundColor = "#ea580c";
            break;
        case 60:
            strengthResult.style.backgroundColor = "#ca8a04";
            break;
        case 80:
            strengthResult.style.backgroundColor = "#65a30d";
            break;
        case 100:
            strengthResult.style.backgroundColor = "#16a34a";
            break;
        default:
            break;
    }
    let ttc = document.querySelector(".ttc");
    ttc.innerText =
        "Time to Crack: " +
        score.crack_times_display.offline_slow_hashing_1e4_per_second;
}