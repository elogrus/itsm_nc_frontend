// Button.tsx
import { defineComponent, type ExtractPublicPropTypes } from 'vue'
import { oneOfProp } from 'vue-ts-types'
import styles from './index.module.css'

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

const Button = defineComponent({
  name: 'Button',
  inheritAttrs: false,
  props: {
    variant: oneOfProp(['primary', 'secondary'] as const).withDefault('primary'),
    type: oneOfProp(['button', 'submit', 'reset'] as const).withDefault('button'),
    disabled: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => (
      <button
        {...attrs}
        type={props.type}
        disabled={props.disabled}
        class={cx(
          styles.button,
          props.variant === 'primary' && styles.primary,
          props.variant === 'secondary' && styles.secondary,
          props.disabled && styles.disabled,
          attrs.class as string | undefined,
        )}
      >
        {slots.default?.()}
      </button>
    )
  },
})

export type ButtonComponentProps = ExtractPublicPropTypes<typeof Button>
export default Button
