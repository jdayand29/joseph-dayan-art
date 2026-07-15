import Image from 'next/image'
import clsx from 'clsx'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizePx = { sm: 20, md: 40, lg: 160 } as const
const sizeClass = { sm: 'h-5 w-5', md: 'h-10 w-10', lg: 'h-32 w-32 sm:h-40 sm:w-40' } as const

export default function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={sizePx[size]}
      height={sizePx[size]}
      className={clsx('rounded-full object-cover', sizeClass[size], className)}
    />
  )
}
