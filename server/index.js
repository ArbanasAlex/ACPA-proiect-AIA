require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', require('./authRoutes'))

const { requireAuth, requireRole } = require('./authMiddleware')

app.get('/me', requireAuth, (req, res) => {
  res.json(req.user)
})

app.get('/admin/test', requireAuth, requireRole('admin'), (req, res) => {
  res.json({ message: 'Ești admin' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server pe portul ${PORT}`))