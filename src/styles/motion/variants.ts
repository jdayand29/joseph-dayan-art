import type { Variants } from 'motion/react'

// Variants JS-driven (Motion) — datos puros, sin JSX. Consumidos por
// Reveal/Stagger (components/ui/). Los 5 primitivos de overlay (Dialog,
// Drawer, Popover, Tooltip, Accordion) NO usan estos variants — se animan
// con CSS puro vía data-state (ver tailwind.config.js), ver ARCHITECTURE.md
// "Motion Rules" para la justificación de esta separación.
export const motionVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
} as const satisfies Record<string, Variants>

export type MotionVariantName = keyof typeof motionVariants
