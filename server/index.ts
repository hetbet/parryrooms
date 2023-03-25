import express from "express";
import path from "path";

let server = express();

// middleware
server.use(express.json());
server.use("/client", express.static("../client"));
server.use("/assets", express.static("../assets"));

// routes
server.get("/", (req, res): void => {
    res.sendFile(path.resolve("../client/login/index.html"));
});

server.get("/register", (req, res): void => {
    res.sendFile(path.resolve("../client/register/index.html"));
});

server.get("/about", (req, res): void => {
    res.sendFile(path.resolve("../client/about/index.html"));
});

// api routes
server.post("/api/register", (req, res): void => {
    console.log("Received registration request");
    console.log(req.body);
});

// listen pls bruh
server.listen(10003, () => {
    console.log("Server running on port 10003.");
});