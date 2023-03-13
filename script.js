function changeLengthValue() {
  let lengthSliderText = document.getElementsByClassName(
    "options-length__text"
  );
  let sliderValue = document.getElementsByClassName("length-slider");
  lengthSliderText[0].innerHTML = "Length: " + sliderValue[0].value;
  let passwordLength = sliderValue[0].value;
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

let symbolsCheckValue = false;
let numbersCheckValue = true;
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
    passwordResult[0].innerHTML = "Select at least one option.";
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
    passwordText[0].innerHTML != "Select at least one option."
  ) {
    navigator.clipboard.writeText(passwordText[0].innerHTML);
  }
}

function copyPassword() {
  console.log(selectedPassword);
  navigator.clipboard.writeText(selectedPassword.lastElementChild.innerHTML);
}

function changeSidebar(e) {
  e[0].classList.addClass("selected");
}

function save() {
  console.log("save");
}

function setSidebarOff() {
  document
    .getElementsByClassName("sidebar-item")[0]
    .classList.remove("selected");
  document
    .getElementsByClassName("sidebar-item")[1]
    .classList.remove("selected");
  document
    .getElementsByClassName("sidebar-item")[2]
    .classList.remove("selected");
}

function setSidebarOn(element) {
  setSidebarOff();
  element.classList.add("selected");
  if (element.classList[2] == "sidebar-item1") {
    document.getElementsByClassName("page1")[0].style.display = "flex";
    document.getElementsByClassName("page2")[0].style.display = "none";
  } else if (element.classList[2] == "sidebar-item2") {
    document.getElementsByClassName("page2")[0].style.display = "flex";
    document.getElementsByClassName("page1")[0].style.display = "none";
  }
}

function savePage() {
  document.getElementsByClassName("container")[0].style.filter = "blur(5px)";
  document.getElementsByClassName("page-denier")[0].style.display = "block";
  document.getElementsByClassName("page-save")[0].style.display = "flex";
  if (
    document.getElementsByClassName("results__password")[0].innerHTML != "" &&
    document.getElementsByClassName("results__password")[0].innerHTML !=
      "Select at least one option."
  ) {
    document.getElementsByClassName("save-input-password")[0].value = document
      .getElementsByClassName("results__password")[0]
      .innerHTML.toString();
  }
}

function savePassword(name, url, password, bool) {
  let savedPassword = document.createElement("div");
  savedPassword.setAttribute("class", "saved-password btn");
  savedPassword.setAttribute("onclick", "reveal(this)");
  let savedPasswordLogo = document.createElement("div");
  savedPasswordLogo.setAttribute("class", "saved-password__logo");
  let savedPasswordLogoImage = document.createElement("img");
  savedPasswordLogoImage.setAttribute(
    "src",
    "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://" +
      url +
      "&size=256"
  );
  let savedPasswordText = document.createElement("span");
  let savedPasswordPassword = document.createElement("span");
  savedPasswordPassword.setAttribute("class", "saved-password__password");
  savedPasswordPassword.innerHTML = password;
  savedPasswordText.setAttribute("class", "saved-password__text");
  savedPasswordText.innerHTML = name;
  savedPasswordLogoImage.setAttribute("class", "saved-password__logo__img");
  savedPasswordLogoImage.setAttribute("alt", name);
  savedPassword.appendChild(savedPasswordLogo);
  savedPasswordLogo.appendChild(savedPasswordLogoImage);
  savedPassword.appendChild(savedPasswordText);
  savedPassword.appendChild(savedPasswordPassword);
  document.getElementById("saved-passwords").appendChild(savedPassword);
  if (bool) {
    saveNewPassword(name, url, password);
  }
}

function savePageCancel() {
  document.getElementsByClassName("container")[0].style.filter = "none";
  document.getElementsByClassName("page-denier")[0].style.display = "none";
  document.getElementsByClassName("page-save")[0].style.display = "none";
  document.getElementsByClassName("save-input-name")[0].style.borderColor =
    "#047857";
  document.getElementsByClassName("save-input-name")[0].style.color = "black";
  document
    .getElementsByClassName("save-input-name")[0]
    .setAttribute("placeholder", "Name");
  for (
    let j = 0;
    j < document.getElementsByClassName("save-input").length;
    j++
  ) {
    document.getElementsByClassName("save-input")[j].value = "";
  }
}

function savePageSave() {
  if (document.getElementsByClassName("save-input-name")[0].value == "") {
    document.getElementsByClassName("save-input-name")[0].style.borderColor =
      "#dc2626";
    return;
  }
  if (
    passwordNames.includes(
      document.getElementsByClassName("save-input-name")[0].value
    )
  ) {
    document
      .getElementsByClassName("save-input-name")[0]
      .setAttribute("placeholder", "Name Already Exists");
    document.getElementsByClassName("save-input-name")[0].value = "";
    return;
  }
  document
    .getElementsByClassName("save-input-name")[0]
    .setAttribute("placeholder", "Name Already Exists");
  savePassword(
    document.getElementsByClassName("save-input-name")[0].value,
    document.getElementsByClassName("save-input-url")[0].value,
    document.getElementsByClassName("save-input-password")[0].value,
    true
  );
  document.getElementsByClassName("container")[0].style.filter = "none";
  document.getElementsByClassName("page-denier")[0].style.display = "none";
  document.getElementsByClassName("page-save")[0].style.display = "none";
  document.getElementsByClassName("save-input-name")[0].style.borderColor =
    "#047857";
  document.getElementsByClassName("save-input-name")[0].style.color = "black";
  for (
    let j = 0;
    j < document.getElementsByClassName("save-input").length;
    j++
  ) {
    document.getElementsByClassName("save-input")[j].value = "";
  }
}

let selectedPassword = undefined;

function reveal(element) {
  document.getElementsByClassName("container")[0].style.filter = "blur(5px)";
  document.getElementsByClassName("page-denier")[0].style.display = "flex";
  document.getElementsByClassName("page-reveal")[0].style.display = "flex";
  document.getElementsByClassName("page-reveal-password")[0].innerHTML =
    element.lastElementChild.innerHTML;
  selectedPassword = element;
}

function revealPageClose() {
  document.getElementsByClassName("container")[0].style.filter = "none";
  document.getElementsByClassName("page-denier")[0].style.display = "none";
  document.getElementsByClassName("page-reveal")[0].style.display = "none";
}

function deletePassword() {
  selectedPassword.remove();
  revealPageClose();
  deleteSavedPassword(
    selectedPassword.firstElementChild.nextElementSibling.innerHTML.toString()
  );
}

let darkMode = localStorage.darkMode;
if (darkMode == "true") {
  darkMode = false;
} else {
  darkMode = true;
}

function setDarkModeOn() {
  if (darkMode) {
    document.getElementsByTagName("body")[0].style.backgroundColor = "white";
    for (
      let index = 0;
      index < document.getElementsByTagName("span").length;
      index++
    ) {
      document.getElementsByTagName("span")[index].style.color = "black";
    }
    darkMode = false;
    localStorage.setItem("darkMode", "false");
  } else {
    document.getElementsByTagName("body")[0].style.backgroundColor = "#1f1f1f";
    for (
      let index = 0;
      index < document.getElementsByTagName("span").length;
      index++
    ) {
      document.getElementsByTagName("span")[index].style.color = "white";
    }
    for (
      let jj = 0;
      jj < document.getElementsByClassName("saved-password__text").length;
      jj++
    ) {
      document.getElementsByClassName("saved-password__text")[jj].style.color =
        "#064e3b";
      ("#65a30d");
    }
    document.getElementsByClassName("header-title__text")[0].style.color =
      "black";

    darkMode = true;
    localStorage.setItem("darkMode", "true");
  }
}

let passwordNames = [];
if (JSON.parse(localStorage.getItem("passwordNames"))) {
  passwordNames = JSON.parse(localStorage.getItem("passwordNames"));
}

function saveNewPassword(name, url, password) {
  let info = [];
  info[0] = name;
  info[1] = url;
  info[2] = password;
  localStorage.setItem(name, JSON.stringify(info));
  passwordNames.push(name);
  localStorage.setItem("passwordNames", JSON.stringify(passwordNames));
}

function deleteSavedPassword(name) {
  localStorage.removeItem(name);
  let indexOfItem = passwordNames.indexOf("name");
  passwordNames.splice(indexOfItem, 1);
  localStorage.setItem("passwordNames", JSON.stringify(passwordNames));
}

function loadPassword(n, bool) {
  savePassword(
    JSON.parse(localStorage.getItem(n))[0],
    JSON.parse(localStorage.getItem(n))[1],
    JSON.parse(localStorage.getItem(n))[2],
    bool
  );
}

function loadPasswords() {
  if (passwordNames.length != 0) {
    for (let index = 0; index < passwordNames.length; index++) {
      let name = passwordNames[index];
      loadPassword(name, false);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setDarkModeOn();
  loadPasswords();
});
