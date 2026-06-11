const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  try {
    // Header-аас token авах
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ 
        message: "Token байхгүй байна" 
      })
    }

    // Token шалгах
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()

  } catch (err) {
    res.status(401).json({ message: "Token буруу байна" })
  }
}

module.exports = { protect }