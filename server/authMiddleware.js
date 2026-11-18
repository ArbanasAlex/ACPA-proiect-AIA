const supabase = require('./supabase')

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Lipsește tokenul' })
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return res.status(401).json({ error: 'Token invalid sau expirat' })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', data.user.id)
    .single()

  req.user = {
    id: data.user.id,
    email: data.user.email,
    role: profile ? profile.role : null,
    full_name: profile ? profile.full_name : null,
  }
  next()
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acces interzis' })
    }
    next()
  }
}

module.exports = { requireAuth, requireRole }