/**
 * @type {HTMLInputElement}
 */
const passwordBox = $("#passwordBox");
/**
 * @type {HTMLProgressElement}
 */
const passwordStrengthBar = $("progress")
/**
 * @type {HTMLSpanElement}
 */
const passwordStrengthDescription = $("#strengthDescription")

function listAppearances(list, target) {
    let appearances = 0;
    for (let el of list) {
        if (el == target) appearances++;
    }
    return appearances;
}

const SPECIAL_CHARACTERS = "!£$%^&*(){}[]:@;#~.,?/|`¬0123456789".split("");
function getPasswordStrength() {
    let strength = 0;
    let seenCharacters = [];
    for (let char of passwordBox.value.split("")) {
        seenCharacters.push(char);
        if (SPECIAL_CHARACTERS.includes(char)) {
            strength += 2 * (1 / listAppearances(seenCharacters, char));
        } else {
            strength += 1 / listAppearances(seenCharacters, char);
        }
    }
    return strength;
}

passwordBox.addEventListener("input", () => {
    passwordStrengthBar.value = getPasswordStrength();

    if (passwordStrengthBar.value >= 22) {
        passwordStrengthBar.style.accentColor = "#4dd5ff";
        passwordStrengthDescription.style.color = "#4dd5ff";
        passwordStrengthDescription.innerHTML = "Great";
    } else if (passwordStrengthBar.value >= 14) {
        passwordStrengthBar.style.accentColor = "#4dff4d";
        passwordStrengthDescription.style.color = "#4dff4d";
        passwordStrengthDescription.innerHTML = "Good";
    } else if (passwordStrengthBar.value >= 9) {
        passwordStrengthBar.style.accentColor = "#ffb03a";
        passwordStrengthDescription.style.color = "#ffb03a";
        passwordStrengthDescription.innerHTML = "Okay";
    } else {
        passwordStrengthBar.style.accentColor = "rgb(255, 82, 82)";
        passwordStrengthDescription.style.color = "rgb(255, 82, 82)";
        passwordStrengthDescription.innerHTML = "Weak";
    }
});