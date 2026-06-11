const express = require('express')

const app = express()
app.use(express.json())

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

app.listen(5000, () => {
  console.log("Server: http://localhost:5000")
})



// // MongoDB холбох
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB холбогдлоо! ✅"))
//   .catch((err) => console.log("Алдаа:", err))

// app.listen(process.env.PORT, () => {
//   console.log(`Server: http://localhost:${process.env.PORT}`)
// })