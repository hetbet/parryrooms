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
/**
 * @type {HTMLDivElement}
 */
const statusMessage = document.querySelector("#statusMessage");

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
    }).then(async res => {
        if (res.ok) {
            alert("woo");
        } else {
            statusMessage.innerHTML = await res.text();
        }
    }).catch(() => {
        alert("Unknown network error.");
    });

});