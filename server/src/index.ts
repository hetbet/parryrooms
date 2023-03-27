import express from "express";
import path from "path";
import mysql from "mysql";
import bcrypt from "bcrypt";
import { readFileSync } from "fs";

import * as util from "./util";
import { generateCaptcha, Captcha } from "./captcha";

// constants
let PATH_PREFIX: string = "";
if (JSON.parse(readFileSync("host.json", "utf-8")).onHost) {
    PATH_PREFIX = "parryrooms/";
}

// application
let server = express();

// database
interface DatabaseCredentials {
    host: string,
    port: number,
    username: string,
    password: string,
    name: string
}
let dbCredentials: DatabaseCredentials = JSON.parse(readFileSync("server/db.json", "utf-8"));
let database = mysql.createConnection({
    "host": dbCredentials.host,
    "port": dbCredentials.port,
    "user": dbCredentials.username,
    "password": dbCredentials.password,
    "database": dbCredentials.name
});
database.connect();

// middleware
server.use(express.json());
server.use("/client", express.static("client"));
server.use("/assets", express.static("assets"));

// routes
server.get("/", (req, res): void => {
    res.sendFile(path.resolve(PATH_PREFIX + "client/login/index.html"));
});

server.get("/register", (req, res): void => {
    res.sendFile(path.resolve(PATH_PREFIX + "client/register/index.html"));
});

server.get("/about", (req, res): void => {
    res.sendFile(path.resolve(PATH_PREFIX + "client/about/index.html"));
});

// api routes

// get request here to get a captcha and store a generated token
server.get("/api/captcha", (req, res): void => {
    let captcha: Captcha = generateCaptcha();

    database.query("INSERT INTO captchas (token, answer, image) VALUES(?, ?, ?);", [
        captcha.token,
        captcha.answer,
        captcha.image
    ]);

    res.send(JSON.stringify({
        "image": captcha.image,
        "token": captcha.token
    }));
});

// post request here if you want an image for an existing captcha token
server.post("/api/captcha", (req, res): void => {
    database.query("SELECT image FROM captchas WHERE token = ?", [
        req.body.token
    ], (err, results: any[]): void => {
        if (results.length == 0) {
            res.status(404);
            res.send("Invalid or unknown CAPTCHA token.");
        } else {
            res.send(results[0].image);
        }
    });
});

server.post("/api/register", async (req, res): Promise<void> => {
    console.log("Received registration request");
    console.log(req.body);

    if (req.body.password != req.body.confirmPassword) {
        res.status(400);
        res.send("Passwords do not match.");
        return;
    }
    if (util.getStrength(req.body.password) < 9) {
        res.status(400);
        res.send("Password is too weak.");
        return;
    }

    let hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    database.query("INSERT INTO credentials (username, password) VALUES(?, ?);", [
        req.body.username,
        hashedPassword
    ]);
});

// listen pls bruh
server.listen(10003, () => {
    console.log("Server running on port 10003.");
});