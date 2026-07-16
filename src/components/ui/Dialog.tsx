'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import IconButton from '@/components/ui/IconButton'

// Reskin completo de @radix-ui/react-dialog con los tokens de Joseph Dayan —
// Radix resuelve foco atrapado/Esc/scroll-lock/ARIA de fábrica, aquí solo se
// define la apariencia. Modal (abajo) es Dialog preconfigurado para
// contenido general; Drawer (deslizante) es la misma base con un preset de
// motion distinto.
//
// Entrada/salida animadas con CSS puro vía data-state (Fase F) — Radix emite
// data-state="open"|"closed" y su Presence interno detecta el fin de la
// animación antes de desmontar, sin forceMount ni levantar el estado `open`
// al consumidor (ver ARCHITECTURE.md "Motion Rules").

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger

interface DialogContentProps extends Omit<ComponentProps<typeof RadixDialog.Content>, 'title'> {
  children: ReactNode
  title: string
  /** Título visualmente oculto pero requerido por Radix para lectores de
   * pantalla — usar cuando el diseño no muestra un <h2> visible. */
  hideTitle?: boolean
  description?: string
}

export function DialogContent({
  children,
  title,
  hideTitle,
  description,
  className,
  ...props
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={clsx(
          'fixed inset-0 z-overlay bg-ink/50',
          'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
          'motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none',
        )}
      />
      {/*
        Centrado vía inset-0 + m-auto (margin, no transform) en vez de
        `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`: ese truco usa
        `transform` para posicionar, la misma propiedad que anima
        `scale-in`/`scale-out` — se pisarían entre sí. m-auto centra sin
        tocar `transform` en absoluto, sin necesitar un wrapper extra.
      */}
      <RadixDialog.Content
        className={clsx(
          'fixed inset-0 z-modal m-auto h-fit w-full max-w-md rounded-card bg-white p-6 shadow-elevated outline-none',
          'data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out',
          'motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none',
          className,
        )}
        {...props}
      >
        <RadixDialog.Title className={clsx('font-serif text-xl font-medium', hideTitle && 'sr-only')}>
          {title}
        </RadixDialog.Title>
        {description && (
          <RadixDialog.Description className="mt-1 text-sm text-ink/60">{description}</RadixDialog.Description>
        )}
        <div className="mt-4">{children}</div>
        <RadixDialog.Close asChild>
          <IconButton aria-label="Cerrar" className="absolute right-3 top-3">
            ✕
          </IconButton>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}

// Alias semántico: mismo Dialog, para cuando el uso es "contenido general"
// (confirmaciones, futuros formularios) en vez de un caso más específico.
export const Modal = Dialog
export const ModalContent = DialogContent
export const ModalTrigger = DialogTrigger
