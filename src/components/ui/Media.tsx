import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

interface MediaProps extends Omit<ImageProps, 'className'> {
  className?: string
}

// Wrapper fino sobre next/image: fondo de color mientras carga (evita el
// "salto" en blanco/transparente) + object-cover por defecto. Soporta
// `placeholder="blur"` + `blurDataURL` si el consumidor los provee — no se
// inventa un blurDataURL falso aquí (necesitaría generarse por imagen real).
export default function Media({ className, ...props }: MediaProps) {
  // Con `fill`, next/image exige `sizes` para elegir el tamaño correcto del
  // srcset — si el consumidor no lo especifica, un default razonable evita
  // la advertencia sin obligar a repetirlo en cada uso dentro de AspectRatio.
  const sizes = props.fill && !props.sizes ? '100vw' : props.sizes

  return <Image className={clsx('bg-canvas-alt object-cover', className)} {...props} sizes={sizes} />
}
