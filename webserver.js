const express = require("express");
const app = express();
const fs = require("fs")

app.get("/index.js", (req, res) => res.sendFile(`${__dirname}\\index.js`));

app.get("*any", (req, res) => {
    res.sendFile(`${__dirname}\\index.html`);
});

app.listen(6767, 'localhost', () => {
    console.log("Started webserver.");
});