'use client'

import * as RadixAccordion from '@radix-ui/react-accordion'
import type { ComponentProps } from 'react'
import clsx from 'clsx'
import { focusRingClassName } from '@/styles/tokens/focus'

export const Accordion = RadixAccordion.Root
export const AccordionItem = RadixAccordion.Item

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof RadixAccordion.Trigger>) {
  return (
    <RadixAccordion.Header>
      <RadixAccordion.Trigger
        className={clsx(
          'flex w-full items-center justify-between border-b border-ink/10 py-4 text-left text-sm font-medium',
          '[&[data-state=open]>span]:rotate-45',
          focusRingClassName,
          className,
        )}
        {...props}
      >
        {children}
        <span aria-hidden="true" className="text-lg transition-transform">
          +
        </span>
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
}

// Alto animado con @keyframes (animation-name) referenciando
// var(--radix-accordion-content-height) — patrón oficial de Radix (Fase F).
// Se probó primero un `transition` continuo sobre grid-template-rows
// (0fr↔1fr) y NO funcionó: @radix-ui/react-collapsible fuerza
// `transitionDuration:0s`/`animationName:none` inline en cada toggle para
// medir el alto real sin interferencia (así calcula esa misma CSS
// variable), lo que mata cualquier `transition` propio en el nodo — pero
// restaura `animationName` a tiempo para que un `animation` (@keyframes)
// si funcione correctamente.
export function AccordionContent({ className, children, ...props }: ComponentProps<typeof RadixAccordion.Content>) {
  return (
    <RadixAccordion.Content
      className={clsx(
        'overflow-hidden text-sm text-ink/70',
        'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
        'motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none',
        className,
      )}
      {...props}
    >
      <div className="pb-3">{children}</div>
    </RadixAccordion.Content>
  )
}
