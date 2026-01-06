// creating node server

import http from 'node:http';

const server = http.createServer((req, res) => {
    console.log(`Request -> ${req.url}`);
    if (req.url === '/') {
        res.end(`Home page`);
    } else if (req.url === '/about') {
        res.end(`About page`);
    } else {
        res.end(`Not found page`)
    }
});

server.listen(3001, () => {
    console.log(`listening on port 3001`);
})