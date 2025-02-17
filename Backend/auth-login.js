const express = require('express');
const router = express.Router();
const { UserModel } = require('./UserSchema');
const jwt = require('jsonwebtoken')
require('dotenv').config();


router.use(express.json());

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        const newUser = await UserModel.create({ username, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.cookie('loggedIn', true, { httpOnly: true });
        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('loggedIn');
    res.status(200).json({ success: true, message: 'Logout successful' });
});



router.post('/auth', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = {
            "username": username,
            "password": password
        };
        const ACCESS_TOKEN = jwt.sign(user, process.env.JWT_SECRET);
        res.cookie('token', ACCESS_TOKEN, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        res.json({ "accessToken": ACCESS_TOKEN });
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;
