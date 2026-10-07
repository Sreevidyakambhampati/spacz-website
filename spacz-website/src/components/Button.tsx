import type { ReactNode, MouseEventHandler } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'secondary-dark' | 'light'
type Size = 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
}

const variants: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-deep shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_8px_20px_-10px_rgb(31_107_239/0.7)]',
  secondary: 'text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/60 hover:bg-ink/[0.03]',
  'secondary-dark': 'text-paper ring-1 ring-inset ring-paper/25 hover:ring-paper/60 hover:bg-paper/[0.04]',
  light: 'bg-paper text-ink hover:bg-white',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-13 px-6 text-[15px]',
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className = '',
  type = 'button',
  disabled,
  ariaLabel,
}: ButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-[6px] font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,box-shadow,color] duration-300 ease-calm disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="relative -mr-1 inline-flex h-4 w-4 overflow-hidden" aria-hidden="true">
          <ArrowRight className="absolute h-4 w-4 transition-transform duration-500 ease-calm group-hover:translate-x-5" />
          <ArrowRight className="absolute h-4 w-4 -translate-x-5 transition-transform duration-500 ease-calm group-hover:translate-x-0" />
        </span>
      )}
    </>
  )
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  )
}
