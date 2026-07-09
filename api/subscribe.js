const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' })
    return
  }

  const { email, role } = req.body || {}

  if (!email || !EMAIL_REGEX.test(email)) {
    res.status(400).json({ error: 'Correo inválido.' })
    return
  }

  // No hay base de datos en este prototipo: se registra en los logs de la función,
  // visibles desde el dashboard de Vercel (Deployments → Logs) o `vercel logs`.
  console.log(`NUEVA SUSCRIPCIÓN ColectArt — correo: ${email} — rol: ${role || 'sin especificar'} — ${new Date().toISOString()}`)

  res.status(200).json({ ok: true })
}
