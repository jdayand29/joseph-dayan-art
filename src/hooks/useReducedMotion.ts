'use client'

import { useReducedMotion as useReducedMotionCore } from 'motion/react'

// Wrapper sobre el hook nativo de motion/react, normalizado a boolean (la
// librería puede devolver null antes del primer render en cliente). Import
// path estable (@/hooks/useReducedMotion) para no atar cada consumidor al
// nombre del paquete de animación.
export function useReducedMotion(): boolean {
  return useReducedMotionCore() ?? false
}
