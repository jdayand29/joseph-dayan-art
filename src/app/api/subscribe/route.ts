import { NextRequest, NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email = body?.email
  const role = body?.role

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Correo inválido.' }, { status: 400 })
  }

  // No hay base de datos en este prototipo: se registra en los logs de la función,
  // visibles desde el dashboard de Vercel (Deployments → Logs) o `vercel logs`.
  console.log(
    `NUEVA SUSCRIPCIÓN Joseph Dayan — correo: ${email} — rol: ${role || 'sin especificar'} — ${new Date().toISOString()}`,
  )

  return NextResponse.json({ ok: true })
}
