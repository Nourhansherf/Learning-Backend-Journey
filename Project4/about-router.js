import express from 'express';

const router = express.Router();

router.get('/about', (req, res, next) => {
    res.send(`Hello from about`);
})

export {
    router
}