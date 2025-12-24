const express = require('express');
const app = express();
const path = require('path');
const os = require('os');
const fs = require('fs');

switch (os.platform()) {
    case 'win32':
        path.sep = '\\';
        break;
    default:
        path.sep = '/';
}

console.log(path.sep);

path.join = (...args) => {
    let p = args.join(path.sep);
    console.log(`Loaded ${p}`);
    return p;
}

app.get('/index.js', (req, res) => res.sendFile(path.join(__dirname, 'index.js')));
app.get('/bad.woff', (req, res) => res.sendFile(path.join(__dirname, 'bad.woff')));
app.get('/comic.woff', (req, res) => res.sendFile(path.join(__dirname, 'comic.woff')));
app.get('/consolas.woff', (req, res) => res.sendFile(path.join(__dirname, 'consolas.woff')));
app.get('/typewriter.woff', (req, res) => res.sendFile(path.join(__dirname, 'typewriter.woff')));

app.get('*any', (req, res) => {
    res.sendFile(`${__dirname}\\index.html`);
});

app.listen(6767, () => {
    console.log('Started webserver.');
});