import type { Variants } from 'motion/react'
import { delay } from '@/styles/tokens/motion'
import { motionVariants } from '@/styles/motion/variants'

// Sin consumidor real en esta fase — construido para el futuro grid de
// ArtworkCatalog (Fase I). Consumido internamente por components/ui/Stagger.tsx.
export function staggerContainer(step: number = delay.staggerStep): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: step / 1000,
      },
    },
  }
}

export const staggerItem = motionVariants.slideUp
