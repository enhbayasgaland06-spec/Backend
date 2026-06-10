const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body

        // Хэрэглэгч байгаа эсэх шалгах
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({
                message: "Email бүртгэлтэй байна"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email, 
            password: hashedPassword
        })

        const token = jwt.sign(
            {id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.status()
    }
    
    catch {
        
    }
}) 