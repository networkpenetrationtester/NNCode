const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


const middleware = (req, res, next) => {
    let _path = path.join(__dirname, req.path);
    let exists = fs.existsSync(_path);
    console.log(`${req.host} REQUESTS ${_path} [${exists ? '200' : '404'}]`);
    if (!exists) { res.send('404'); return; }
    next();
}

app.use(middleware);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/*any', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

app.listen(6767, () => {
    console.log('Started webserver.');
});