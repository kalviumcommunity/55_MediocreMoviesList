const express = require('express');
const app = express.Router();
const { userModel } = require('./UserSchema');
const Joi = require('joi');
const cors = require('cors');

app.use(express.json());
app.use(cors());


const signupSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

app.post('/signup', async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const user = await userModel.create(req.body);
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { username, password } = req.body;
        const user = await userModel.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }

        res.cookie('username', username, { httpOnly: true });
        res.cookie('password', password, { httpOnly: true });

        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('password');

    res.status(200).json({ message: 'Logout successful' });
});

module.exports = app;
