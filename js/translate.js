import {changeLengthValue} from "./options.js";
export let ttcText = "Time to Crack: ";
export let lengthText = "Length: ";
export let oneOptionText = "Select at least one option.";
export let currentLanguage = localStorage.getItem("currentLanguage");

if(currentLanguage == "english"){
    translateToEnglish();
}
if (currentLanguage == "persian"){
    translateToPersian();
}

if (!currentLanguage){
    localStorage.setItem("currentLanguage", "english")
    currentLanguage = localStorage.getItem("currentLanguage")
}

function switchLanguage(){
    if (currentLanguage == "english"){
        localStorage.setItem("currentLanguage", "persian")
        currentLanguage = localStorage.getItem("currentLanguage")
    }
    else {
        localStorage.setItem("currentLanguage", "english")
        currentLanguage = localStorage.getItem("currentLanguage")
    }
}

function translateToPersian() {
    document.querySelector(".title-passbuilder").innerHTML = "ساخت گذرواژه";
    document.querySelector(".title-passbuilder").classList.add("persian");

    document.querySelector(".title-passwords").innerHTML = "گذرواژه ها";
    document.querySelector(".title-passwords").classList.add("persian");

    document.querySelector(".title-darkmode").innerHTML = "حالت تیره";
    document.querySelector(".title-darkmode").classList.add("persian");

    document.querySelector(".title-translate").innerHTML = "Translate";
    document.querySelector(".title-translate").classList.remove("persian")

    document.querySelector(".options-length__text").innerHTML = "طول: ";
    document.querySelector(".options-length__text").classList.add("persian");

    lengthText = "طول: ";
    changeLengthValue();

    document.querySelector(".numbers").innerHTML = "اعداد";
    document.querySelector(".numbers").classList.add("persian");
    document.querySelector(".symbols").innerHTML = "نشانه ها";
    document.querySelector(".symbols").classList.add("persian");
    document.querySelector(".ambiguous").innerHTML = "حروف مبهم";
    document.querySelector(".ambiguous").classList.add("persian");
    document.querySelector(".lowercase").innerHTML = "حروف کوچک";
    document.querySelector(".lowercase").classList.add("persian");
    document.querySelector(".uppercase").innerHTML = "حروف بزرگ";
    document.querySelector(".uppercase").classList.add("persian");
    document.querySelector(".similars").innerHTML = "حروف مشابه";
    document.querySelector(".similars").classList.add("persian");


    oneOptionText = "لطفاً حداقل یک گزینه را انتخاب کنید.";

    document.querySelector(".save-btn").innerHTML = "ذخیره";
    document.querySelector(".save-btn").classList.add("persian");
    document.querySelector(".cancel-save").innerHTML = "لغو";
    document.querySelector(".cancel-save").classList.add("persian");
    document.querySelector(".cancel-reveal").innerHTML = "لغو";
    document.querySelector(".cancel-reveal").classList.add("persian");
    document.querySelector(".delete-btn").innerHTML = "حذف";
    document.querySelector(".delete-btn").classList.add("persian");

    document.querySelector(".no-passwords").innerHTML = "گذرواژه های ذخیره شده اینجا نشان داده خواهند شد.";
    document.querySelector(".no-passwords").classList.add("persian");
}

function translateToEnglish(){
    document.querySelector(".title-passbuilder").innerHTML = "PassBuilder";
    document.querySelector(".title-passbuilder").classList.remove("persian");

    document.querySelector(".title-passwords").innerHTML = "Passwords";
    document.querySelector(".title-passwords").classList.remove("persian");

    document.querySelector(".title-darkmode").innerHTML = "Dark Mode";
    document.querySelector(".title-darkmode").classList.remove("persian");

    document.querySelector(".title-translate").innerHTML = "تغییر زبان";
    document.querySelector(".title-translate").classList.add("persian")

    document.querySelector(".options-length__text").innerHTML = "Length: ";
    document.querySelector(".options-length__text").classList.remove("persian");

    lengthText = "Length: ";
    changeLengthValue();

    document.querySelector(".numbers").innerHTML = "Numbers";
    document.querySelector(".numbers").classList.remove("persian");
    document.querySelector(".symbols").innerHTML = "Symbols";
    document.querySelector(".symbols").classList.remove("persian");
    document.querySelector(".ambiguous").innerHTML = "Ambiguous Characters";
    document.querySelector(".ambiguous").classList.remove("persian");
    document.querySelector(".lowercase").innerHTML = "Lowercase Letters";
    document.querySelector(".lowercase").classList.remove("persian");
    document.querySelector(".uppercase").innerHTML = "Uppercase Letters";
    document.querySelector(".uppercase").classList.remove("persian");
    document.querySelector(".similars").innerHTML = "Similar Characters";
    document.querySelector(".similars").classList.remove("persian");


    oneOptionText = "Select at least one option.";

    document.querySelector(".save-btn").innerHTML = "Save";
    document.querySelector(".save-btn").classList.remove("persian");
    document.querySelector(".cancel-save").innerHTML = "Cancel";
    document.querySelector(".cancel-save").classList.remove("persian");
    document.querySelector(".cancel-reveal").innerHTML = "Cancel";
    document.querySelector(".cancel-reveal").classList.remove("persian");
    document.querySelector(".delete-btn").innerHTML = "Delete";
    document.querySelector(".delete-btn").classList.remove("persian")

    document.querySelector(".no-passwords").innerHTML = "Save a password to show it here.";
    document.querySelector(".no-passwords").classList.remove("persian");
}

export function translate(){
    if (currentLanguage == "english"){
        translateToPersian();
    }
    else {
        translateToEnglish();
    }
    switchLanguage()

}