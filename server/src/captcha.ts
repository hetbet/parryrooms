import canvaslib from "canvas";
import { v4 as uuidv4 } from "uuid";

import { randint } from "./util";

export interface Captcha {
    image: string,
    token: string
}

export function generateCaptcha(): Captcha {
    let captchaAnswer = randint(10000, 99999).toString();

    let canvas = canvaslib.createCanvas(80, 25);
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = `rgb(${randint(100, 255)},${randint(100, 255)},${randint(100, 255)})`;
    ctx.fillRect(0, 0, 80, 25);

    ctx.font = "24px Arial";
    ctx.fillStyle = "#000000";
    for (let i = 0; i < 5; i++) {
        ctx.fillText(captchaAnswer[i], i * 15 + 3, randint(14, 26));
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < randint(5, 10); i++) {
        ctx.strokeStyle = `rgb(${randint(0, 255)},${randint(0, 255)},${randint(0, 255)})`;
        ctx.beginPath();
        ctx.moveTo(randint(0, 80), randint(0, 25));
        ctx.lineTo(randint(0, 80), randint(0, 25));
        ctx.stroke();
        ctx.closePath();
    }

    return {
        "image": canvas.toDataURL(),
        "token": uuidv4()
    };
}