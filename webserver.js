const express = require("express");
const app = express();
const fs = require("fs")

app.get("/index.js", (req, res) => res.sendFile(`${__dirname}\\index.js`));
app.get("/bad.woff", (req, res) => res.sendFile(`${__dirname}\\bad.woff`));
app.get("/comic.woff", (req, res) => res.sendFile(`${__dirname}\\comic.woff`));
app.get("/consolas.woff", (req, res) => res.sendFile(`${__dirname}\\consolas.woff`));
app.get("/typewriter.woff", (req, res) => res.sendFile(`${__dirname}\\typewriter.woff`));

app.get("*any", (req, res) => {
    res.sendFile(`${__dirname}\\index.html`);
});

app.listen(6767, () => {
    console.log("Started webserver.");
});