const express = require('express');
const Router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = 'layout/admin';
const jwtSecret = process.env.JWT_SECRET;



/**
 * GET /
 * admin dashboard
 */

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'unauthorized' });
    }
}


/**
 * GET /
 * admin login page
 */


Router.get('/admin', async (req, res) => {
    try {
        
        const locals = {
            title: "admin",
            description: "blog"
        }

        res.render('admin/index', {locals, layout: adminLayout})
    } catch (error) {
        console.log(error);
    }
})

/**
 * POST /
 * admin check login
 */

Router.post('/admin', async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret || '');
        res.cookie('token', token, { httpOnly: true });

        return res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
})


/**
 * GET /
 * admin dashboard
 */

Router.get('/dashboard', authMiddleware, async (req, res) => {

    try {
        
        const locals = { title: 'Dashboard', description: 'Admin' };
        const data = await Post.find();
        res.render('admin/dashboard', { locals, data, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
})

/**
 * GET /
 * admin create post
 */

Router.get('/add-post', authMiddleware, async (req, res) => {

    try {

        const locals = { title: 'add post', description: 'Admin' };
        const data = await Post.find();
        res.render('admin/add-post', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
})


/**
 * post /
 * admin create post
 */

Router.post('/add-post', authMiddleware, async (req, res) => {

    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });

            await Post.create(newPost);
            res.redirect('/dashboard');

        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
});


/**
 * GET /
 * admin create post
 */

Router.get('/edit-post/:id', authMiddleware, async (req, res) => {

    try {

        const locals = { title: 'edit post', description: 'Admin' };
        const data = await Post.findOne({ _id: req.params.id });
        res.render('admin/edit-post', { data, layout: adminLayout, locals });
    } catch (error) {
        console.log(error);
    }
});


/**
 * PUT /
 * admin create post
 */

Router.put('/edit-post/:id', authMiddleware, async (req, res) => {

    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });
        res.redirect(`/edit-post/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
});



// Router.post('/admin', async (req, res) => {


//     try {

//         const { username, password } = req.body;
//         if (req.body.username === 'admin' && req.body.password === 'password') {
//             res.send('you are logged in.');
//         } else {
//             res.send('wrong username or password');
//         }

//         res.render('admin/index', { locals, layout: adminLayout })
//     } catch (error) {
//         console.log(error);
//     }
// })


/**
 * POST /
 * admin register
 */

Router.post('/register', async (req, res) => {


    try {

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const newUser = await User.create({ username, password: hashedPassword });
            return res.status(201).json({ message: 'user created', user: newUser });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({ message: 'user already in use' });
            }
            return res.status(500).json({ message: 'internal server error' });
        }
    } catch (error) {
        console.log(error);
    }
})


/**
 * Delete /
 * admin delete post
 */

Router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET /
 * admin logout
 */

Router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
    
})



module.exports = Router;