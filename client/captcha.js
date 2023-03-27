/**
 * @type {HTMLImageElement}
 */
const captchaImage = document.querySelector("#captchaImage");
/**
 * @type {HTMLInputElement}
 */
const captchaBox = document.querySelector("#captchaBox");

let mostRecentGuess = "";
captchaBox.addEventListener("input", () => {
    if (isNaN(Number(captchaBox.value)) || captchaBox.value.length > 5) {
        captchaBox.value = mostRecentGuess;
    } else {
        mostRecentGuess = captchaBox.value;
    }
});

function fetchCaptcha() {
    fetch("/api/captcha", {
        "method": "GET"
    }).then(async res => {
        let captcha = await res.json();
    
        captchaImage.src = captcha.image;
        localStorage.setItem("parryrooms_captcha_token", captcha.token);
    });
}

let currentCaptchaToken = localStorage.getItem("parryrooms_captcha_token");
if (currentCaptchaToken == null) {
    fetchCaptcha();
} else {
    fetch("/api/captcha", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            "token": currentCaptchaToken
        })
    }).then(async res => {
        if (res.ok) {
            captchaImage.src = await res.text();
        } else {
            localStorage.removeItem("parryrooms_captcha_token");
            fetchCaptcha();
        }
    });
}

