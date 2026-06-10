const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

const userRoutes = require('./routes/UseRoutes')
app.use('/users', userRoutes)

// MongoDB холбох
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB холбогдлоо! ✅"))
  .catch((err) => console.log("Алдаа:", err))

app.listen(process.env.PORT, () => {
  console.log(`Server: http://localhost:${process.env.PORT}`)
})