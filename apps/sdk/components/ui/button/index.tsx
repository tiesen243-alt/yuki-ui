'use client'

import { createParts } from '@ui-sdk/react/primitive'
import { cn } from 'cn'

import type { ButtonVariants } from '@/components/ui/button/variant'

import { button } from '@/components/ui/button/primitive'
import { buttonVariants } from '@/components/ui/button/variant'

const { Root } = createParts(button, {
  root: 'button',
})

interface ButtonProps
  extends React.ComponentProps<typeof Root>, ButtonVariants {}

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <Root
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
