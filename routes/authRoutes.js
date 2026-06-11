const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// MongoDB-н оронд array ашиглана
let users = []

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Хэрэглэгч байгаа эсэх шалгах
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return res.status(400).json({ 
        message: "Email бүртгэлтэй байна" 
      })
    }

    // Нууц үг hash хийх
    const hashedPassword = await bcrypt.hash(password, 10)

    // Хэрэглэгч үүсгэх
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword
    }
    users.push(user)

    // Token үүсгэх
    const token = jwt.sign(
      { id: user.id },
      'mysecretkey123',
      { expiresIn: '7d' }
    )

    res.status(201).json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email }
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Хэрэглэгч олох
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(400).json({ 
        message: "Email буруу байна" 
      })
    }

    // Нууц үг шалгах
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ 
        message: "Нууц үг буруу байна" 
      })
    }

    // Token үүсгэх
    const token = jwt.sign(
      { id: user.id },
      'mysecretkey123',
      { expiresIn: '7d' }
    )

    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email }
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router