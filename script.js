function changeLengthValue() {
  let lengthSliderText = document.getElementsByClassName(
    "options-length__text"
  );
  let sliderValue = document.getElementsByClassName("length-slider");
  lengthSliderText[0].innerHTML = "Length: " + sliderValue[0].value;
  let passwordLength = sliderValue[0].value;
}

let symbolsCheckValue = false;
let numbersCheckValue = false;
let ambiguousCheckValue = false;
let lowercaseCheckValue = false;
let uppercaseCheckValue = false;
let similarCheckValue = false;

function symbolsCheck() {
  symbolsCheckValue = !symbolsCheckValue;
}
function numbersCheck() {
  numbersCheckValue = !numbersCheckValue;
}
function ambiguousCheck() {
  ambiguousCheckValue = !ambiguousCheckValue;
}
function lowercaseCheck() {
  lowercaseCheckValue = !lowercaseCheckValue;
}
function uppercaseCheck() {
  uppercaseCheckValue = !uppercaseCheckValue;
}
function similarCheck() {
  similarCheckValue = !similarCheckValue;
}

function generatePassword() {
  let numbers = "23456789";
  let symbols = "!@#$%^&*()";
  let ambiguous = '>,.?-_=+[]{}/\\"';
  let lowercase = "abcdefghijklmnpqrstuvwxyz";
  let uppercase = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
  let similar = "iI1L0oOcC";
  let selectedChars = "";
  let password = "";
  if (symbolsCheckValue == true) {
    selectedChars += symbols;
  }
  if (numbersCheckValue == true) {
    selectedChars += numbers;
  }
  if (ambiguousCheckValue == true) {
    selectedChars += ambiguous;
  }
  if (lowercaseCheckValue == true) {
    selectedChars += lowercase;
  }
  if (uppercaseCheckValue == true) {
    selectedChars += uppercase;
  }
  if (similarCheckValue == true) {
    selectedChars += similar;
  }

  let lengthSliderText = document.getElementsByClassName(
    "options-length__text"
  );
  let sliderValue = document.getElementsByClassName("length-slider");
  let passwordLength = sliderValue[0].value;

  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * selectedChars.length);
    password += selectedChars[randomIndex];
  }

  let passwordResult = document.getElementsByClassName("results__password");
  if (
    symbolsCheckValue == false &&
    numbersCheckValue == false &&
    ambiguousCheckValue == false &&
    lowercaseCheckValue == false &&
    uppercaseCheckValue == false &&
    similarCheckValue == false
  ) {
    passwordResult[0].innerHTML = "Select atleast one option.";
    return;
  }
  passwordResult[0].innerHTML = password;
  let score = zxcvbn(password);
  let strengthWidth = (score.score + 1) * 20;
  let strengthResult = document.getElementsByClassName("strength");
  strengthResult[0].style.width = strengthWidth.toString() + "%";
  switch (strengthWidth) {
    case 20:
      strengthResult[0].style.backgroundColor = "#dc2626";
      break;
    case 40:
      strengthResult[0].style.backgroundColor = "#ea580c";
      break;
    case 60:
      strengthResult[0].style.backgroundColor = "#ca8a04";
      break;
    case 80:
      strengthResult[0].style.backgroundColor = "#65a30d";
      break;
    case 100:
      strengthResult[0].style.backgroundColor = "#16a34a";
      break;
    default:
      break;
  }
  let ttc = document.getElementsByClassName("ttc");
  ttc[0].innerHTML =
    "Time To Crack: " +
    score.crack_times_display.offline_slow_hashing_1e4_per_second;
  let feedback = document.getElementsByClassName("feedback");
  console.log(score);
}

function copy() {
  let passwordText = document.getElementsByClassName("results__password");
  if (
    passwordText[0].innerHTML != "" &&
    passwordText[0].innerHTML != "Select atleast one option."
  ) {
    navigator.clipboard.writeText(passwordText[0].innerHTML);
  }
}

function save() {
  console.log("saved");
}
