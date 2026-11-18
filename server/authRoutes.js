const express = require('express')
const { createClient } = require('@supabase/supabase-js')

const router = express.Router()

const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email și parolă obligatorii' })
  }

  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return res.status(401).json({ error: 'Email sau parolă greșită' })
  }

  res.json({
    access_token: data.session.access_token,
    user: { id: data.user.id, email: data.user.email },
  })
})

module.exports = router