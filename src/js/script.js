import * as darkMode from "./darkmode.js";
import * as passwordManager from "./passwordManager.js";
import {addEvents} from "./events.js"

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

darkMode.setDarkModeOn();
passwordManager.loadPasswords();
addEvents();
