const express = require('express');
const app = express();
const path = require('path');

path.join = (...args) => {
    let _path = args.join(path.sep);
    console.log(`Loaded ${_path}`);
    return _path;
}

app.get('/index.js', (req, res) => res.sendFile(path.join(__dirname, 'index.js')));
app.get('/bad.woff', (req, res) => res.sendFile(path.join(__dirname, 'bad.woff')));
app.get('/comic.woff', (req, res) => res.sendFile(path.join(__dirname, 'comic.woff')));
app.get('/consolas.woff', (req, res) => res.sendFile(path.join(__dirname, 'consolas.woff')));
app.get('/typewriter.woff', (req, res) => res.sendFile(path.join(__dirname, 'typewriter.woff')));

app.get('/nncode', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(6767, () => {
    console.log('Started webserver.');
});