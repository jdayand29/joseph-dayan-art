import { useEffect, useState } from 'react'

function formatRemaining(ms) {
  if (ms <= 0) return 'Finalizada'
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (days > 0) return `${days}d ${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  return `${minutes}m ${seconds}s`
}

export default function CountdownTimer({ endTime, className = '' }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = endTime - now
  const urgent = remaining > 0 && remaining < 1000 * 60 * 60

  return (
    <span className={`${className} ${urgent ? 'text-red-600 font-semibold' : ''}`}>
      {formatRemaining(remaining)}
    </span>
  )
}
