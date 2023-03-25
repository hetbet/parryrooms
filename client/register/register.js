/**
 * @type {HTMLInputElement}
 */
const usernameBox = document.querySelector("#usernameBox");
/**
 * @type {HTMLInputElement}
 */
const confirmPasswordBox = document.querySelector("#confirmPasswordBox");
/**
 * @type {HTMLButtonElement}
 */
const registerButton = document.querySelector("button");

registerButton.addEventListener("click", () => {

    fetch("/api/register", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "username": usernameBox.value,
            "password": passwordBox.value,
            "confirmPassword": confirmPasswordBox.value
        })
    }).then(res => {
        if (res.ok) {
            alert("woo");
        }
    }).catch(() => {
        alert("Unknown network error.");
    });

});