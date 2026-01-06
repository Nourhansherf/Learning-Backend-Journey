// import express from 'express';
// import { router } from './about-router.js';

// const app = express();

// // app.use((req, res, next) => {
// //     if (req.url === '/') res.end(`Hello from home`);
// //     else if (req.url === '/about') res.end(`Hello from about`);
// //     else res.end(`404 not found`);
// // });

// //* all request methods GET, POST, PUT, DELETE

// app.get('/', (req, res, next) => {
//     res.send(`hello from home`);
// });

// app.use(router);

// app.use((req, res, next) => {
//     res.send(`404 not found`);
// });

// app.listen(3000, () => {
//     console.log(`Server listen on port 3000`);
// });

import express from 'express';

import path from 'path';

const app = express();

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, 'statics')));


app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    
    res.sendFile(path.join(__dirname, 'index.html'));

})

app.listen(3000, () => {
    console.log(`listning on port 3000`);
})
