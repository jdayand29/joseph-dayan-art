'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import { LazyMotion, domMax, m } from 'motion/react'
import IconButton from '@/components/ui/IconButton'
import Media from '@/components/ui/Media'
import { transitions } from '@/styles/motion/transitions'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ArtworkLightboxProps {
  src: string
  alt: string
  width: number
  height: number
}

// Tercer skin sobre @radix-ui/react-dialog (misma base que Dialog/Drawer),
// sin pasar por DialogContent — su tarjeta blanca centrada no aplica a un
// visor de imagen a pantalla completa. La transición de elemento compartido
// (layoutId, aquí) estaba reservada desde Fase F (ver
// styles/motion/transitions.ts, lightboxTransition) — primer y único
// consumidor de domMax del proyecto, aislado a este componente vía su propio
// LazyMotion (mismo patrón que Reveal/Stagger con domAnimation).
export default function ArtworkLightbox({ src, alt, width, height }: ArtworkLightboxProps) {
  const reducedMotion = useReducedMotion()
  const layoutId = `lightbox-${src}`
  const transition = reducedMotion ? { duration: 0 } : transitions.lightboxTransition

  return (
    <LazyMotion features={domMax} strict>
      <RadixDialog.Root>
        <RadixDialog.Trigger asChild>
          <button
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl"
            aria-label="Ampliar imagen"
          >
            <m.div
              layout
              layoutId={layoutId}
              transition={transition}
              style={{ aspectRatio: width / height }}
              className="relative w-full overflow-hidden"
            >
              <Media
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </m.div>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              ⤢ Ampliar
            </span>
          </button>
        </RadixDialog.Trigger>

        <RadixDialog.Portal>
          <RadixDialog.Overlay
            className="fixed inset-0 z-overlay bg-ink/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none"
          />
          <RadixDialog.Content asChild aria-describedby={undefined}>
            <m.div
              layout
              layoutId={layoutId}
              transition={transition}
              style={{ aspectRatio: width / height }}
              className="fixed inset-0 z-modal m-auto max-h-[85vh] max-w-[90vw] overflow-hidden rounded-lg outline-none"
            >
              <RadixDialog.Title className="sr-only">{alt}</RadixDialog.Title>
              <Media src={src} alt={alt} fill sizes="90vw" className="object-contain" />
              <RadixDialog.Close asChild>
                <IconButton aria-label="Cerrar" variant="light" className="absolute right-5 top-5">
                  ✕
                </IconButton>
              </RadixDialog.Close>
            </m.div>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    </LazyMotion>
  )
}
