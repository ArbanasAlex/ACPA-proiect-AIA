require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', require('./authRoutes'))
const requireAuth = require('./authMiddleware')

app.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server pe portul ${PORT}`))