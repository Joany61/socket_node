const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')                                                                                                                                                                                                                                
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', async (req, res) => {
    try{
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashedPassword})
        await user.save()
        res.status(201).json({ message: 'User registered successfully' })
    }
    catch(e){
        console.log(JSON.stringify(req.body))
        res.status(500).json({ error: 'Registration failed '})
        console.log('error: ' + e)
    }
})

router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body
        let token = null
        const user = await User.findOne({ username })
        if (!user){
            return res.status(401).json({ error: 'Authentication failed' })
        }
        else if (bcrypt.compare(password, user.password)) {
            token = jwt.sign({userId: user._id}, process.env.SECRET_KEY || '004AZERTY' , {
                expiresIn: '1h',
            });
        }
        else {
            return res.status(401).json({message: 'Bad password'})
        }
        res.status(200).json({ token })
    }
    catch(e){
        res.status(500).json({ error: 'Login failed'})
        console.log('error: ' + e)
    }
})

module.exports = router