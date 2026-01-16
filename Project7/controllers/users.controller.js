const Users = require('../models/user.model');
const status = require('../utils/httpStatusText');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../utils/generateJWT');
const generateJWT = require('../utils/generateJWT');

const getAllUsers = async (req, res) => {
    try {
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;
        const users = await Users.find({}, { '__v': false, 'password': false }).limit(limit).skip(skip);
        res.status(200).json({
            status: status.SUCCESS,
            data: {
                users
            }
        })
    } catch (err) {
        res.status(400).json({
            status: status.ERROR,
            data: {msg: err}
        })
    }
}

const register = async (req, res) => { 
    const { firstName, lastName, email, password } = req.body;
    try {
        const oldUser = await Users.findOne({ email: email });
        if (oldUser) {
            return res.status(400).json({
                status: status.FAIL,
                data: {
                    error: 'User already exists'
                } 
            })
        }
        const passHash = await bcrypt.hash(password, 12);
        const newUser = new Users({
            firstName,
            lastName,
            email,
            password: passHash
        });
        const token = await generateJWT({ email: newUser.email, id: newUser._id })
        newUser.token = token;
        await newUser.save();
        res.status(201).json({
            status: status.SUCCESS,
            data: { user: newUser }
        });
    } catch (err) {
            res.status(400).json({
                status: status.ERROR,
                data: {error: err}
        })
    }
}

const login = async (req, res) => { 
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) {
        return res.status(400).json({
            status: status.FAIL,
            data: { msg: 'Invalid credentials' }
        });
    }
    const comPass = await bcrypt.compare(password, user.password);
    if (!comPass) {
        return res.status(400).json({
            status: status.FAIL,
            data: { msg: 'Invalid credentials' }
        });
    }
    const token = await generateJWT({ email: user.email, id: user._id });
    res.status(200).json({
        status: status.SUCCESS,
        data: {
            token: token
        }
    });
}

module.exports = {
    getAllUsers,
    register,
    login
}