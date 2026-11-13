import { definePrimitive } from '@ui-sdk/core'

export interface ButtonOptions {}

export const button = definePrimitive({
  name: 'button',
  options: {},
  state: (_options: ButtonOptions) => ({ pressed: false }),
  api: (ctx) => ({
    press() {
      ctx.store.set({ pressed: true })
    },
    release() {
      ctx.store.set({ pressed: false })
    },
  }),
  slots: (slot) => ({
    root: slot<{}, { pressed: boolean }>({
      state: (state) => ({ pressed: state.pressed }),
      attrs: (state) => ({
        tabIndex: '0',
        type: 'button',
        'data-slot': 'button',
        'aria-pressed': String(state.pressed),
      }),
      on: {
        mousedown: (_, ctx) => ctx.api.press(),
        mouseup: (_, ctx) => ctx.api.release(),
      },
    }),
  }),
})
