import { definePrimitive } from '@ui-sdk/core'

export interface SelectOptions {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  items?: { value: string; label: string }[]
}

export const select = definePrimitive({
  name: 'select',
  options: {
    defaultValue: 'string',
    value: 'string',
    onValueChange: 'callback',
    items: 'list',
  },
  state: (options: SelectOptions) => ({
    open: false,
    value: options.value ?? options.defaultValue ?? null,
    onValueChange: options.onValueChange ?? (() => {}),
    items: options.items ?? [],
  }),
  api: (ctx) => ({
    toggle() {
      ctx.store.set({ open: !ctx.store.get().open })
    },
    setValue(value: string) {
      ctx.store.set({ value })
      ctx.store.get().onValueChange(value)
    },
  }),
  slots: (slot) => ({
    root: slot<{}, { open: boolean; value: string | null }>({
      state: (state) => ({
        open: state.open,
        value: state.value,
      }),
      attrs: (state) => ({
        'data-slot': 'select',
        'data-open': String(state.open),
        'data-value': state.value ?? '',
      }),
    }),

    trigger: slot<
      {},
      { open: boolean; value: string | null; items: SelectOptions['items'] }
    >({
      state: (state) => ({
        open: state.open,
        value: state.value,
        items: state.items,
      }),
      attrs: (state) => ({
        'data-slot': 'select-trigger',
        'data-open': String(state.open),
        'aria-haspopup': 'listbox',
        'aria-expanded': String(state.open),
      }),
      press: (ctx) => ctx.api.toggle(),
    }),

    content: slot<{}, { open: boolean }>({
      state: (state) => ({ open: state.open }),
      attrs: (state) => ({
        id: 'select-listbox',
        role: 'listbox',
        'data-slot': 'select-content',
        'data-open': String(state.open),
        'aria-hidden': String(!state.open),
      }),
    }),

    item: slot<
      { value: string; disabled?: boolean },
      { isSelected: boolean; disabled: boolean }
    >({
      props: {
        value: 'string',
        disabled: 'boolean',
      },
      state: (state, ctx) => ({
        isSelected: state.value === ctx.props.value,
        disabled: ctx.props.disabled ?? false,
      }),
      attrs: (state, ctx) => ({
        'data-slot': 'select-item',
        'data-selected': String(state.value === ctx.props.value),
        role: 'option',
        'aria-selected': String(state.value === ctx.props.value),
        'aria-disabled': String(ctx.props.disabled ?? false),
        ...(ctx.props.disabled && { disabled: 'true', tabIndex: '-1' }),
      }),
      press: (ctx) => {
        if (ctx.props.disabled) return

        ctx.api.setValue(ctx.props.value)
        ctx.api.toggle()
      },
    }),
  }),
})
