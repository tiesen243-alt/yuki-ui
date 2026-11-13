'use client'

import { createParts } from '@ui-sdk/react/primitive'
import { cn } from 'cn'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button/variant'
import { select } from '@/components/ui/select/primitive'

const { Root, Trigger, Content, Item } = createParts(select, {
  root: 'div',
  trigger: 'button',
  content: 'div',
  item: 'button',
})

function Select({ className, ...props }: React.ComponentProps<typeof Root>) {
  return <Root className={cn('relative', className)} {...props} />
}

function SelectTrigger({
  className,
  children: _children,
  placeholder = 'Select an option',
  ...props
}: React.ComponentProps<typeof Trigger> & {
  placeholder?: string
}) {
  return (
    <Trigger
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'w-full justify-between',
        className
      )}
      {...props}
    >
      {(state) => {
        const label =
          state.items?.find((item) => item.value === state.value)?.label ??
          state.value ??
          placeholder

        return (
          <>
            <span
              className={cn('text-sm', !state.value && 'text-muted-foreground')}
            >
              {label}
            </span>

            <ChevronDownIcon
              className={cn(
                'text-muted-foreground transition-transform duration-200',
                state.open ? 'rotate-180' : 'rotate-0'
              )}
            />
          </>
        )
      }}
    </Trigger>
  )
}

function SelectContent({
  className,
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Content
      className={cn(
        'absolute left-0 z-50 mt-2 h-auto max-h-40 w-full flex-col gap-1 overflow-y-auto rounded-lg border bg-popover p-2',
        'data-[open=false]:hidden data-[open=true]:flex',
        'fade-in slide-in-from-top-4 data-[open=true]:animate-in',
        'fade-out slide-out-to-top-4 data-[open=false]:animate-out',
        'duration-200',
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'justify-between data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground dark:data-[selected=true]:bg-accent/50',
        className
      )}
      {...props}
    >
      {(state) => (
        <>
          <span className='text-sm'>
            {typeof children === 'function' ? children(state) : children}
          </span>

          {state.isSelected && (
            <CheckIcon data-icon='inline-end' className='size-3' />
          )}
        </>
      )}
    </Item>
  )
}

export { Select, SelectTrigger, SelectContent, SelectItem }
