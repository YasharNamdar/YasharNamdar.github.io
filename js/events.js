import * as sidebar from "./sidebar.js";
import * as darkMode from "./darkmode.js"
import * as options from "./options.js";
import * as modal from "./modal.js";
import * as generator from "./generator.js";
import * as passwordManager from "./passwordManager.js"
import * as translator from "./translate.js"

export function addEvents() {
    document.querySelector(".sidebar-item1").addEventListener("click", function () {
        sidebar.setSidebarOn(this);
    });
    document.querySelector(".sidebar-item2").addEventListener("click", function () {
        sidebar.setSidebarOn(this);
    });

    document.querySelector(".sidebar-item3").addEventListener("click", darkMode.setDarkModeOn);

    document.querySelector(".length-slider").addEventListener("input", options.changeLengthValue);

    document.querySelector(".numbers-check").addEventListener("click", options.numbersCheck);
    document.querySelector(".symbols-check").addEventListener("click", options.symbolsCheck);
    document.querySelector(".ambiguous-check").addEventListener("click", options.ambiguousCheck);
    document.querySelector(".lowercase-check").addEventListener("click", options.lowercaseCheck);
    document.querySelector(".uppercase-check").addEventListener("click", options.uppercaseCheck);
    document.querySelector(".similar-check").addEventListener("click", options.similarCheck);

    document.querySelector(".results__copy__page1").addEventListener("click", options.copyGeneratedPassword);
    document.querySelector(".results__save__page1").addEventListener("click", modal.savePageReveal);

    document.querySelector(".generate-btn").addEventListener("click", generator.generatePassword);

    document.querySelector(".save-btn").addEventListener("click", modal.savePageConfirm);
    document.querySelector(".cancel-save").addEventListener("click", modal.savePageCancel);

    document.querySelector(".reveal__copy").addEventListener("click", modal.copyPassword)

    document.querySelector(".delete-btn").addEventListener("click", passwordManager.deletePassword)
    document.querySelector(".cancel-reveal").addEventListener("click", modal.revealPageClose)

    document.querySelector(".btn-translate").addEventListener("click", translator.translate)
}