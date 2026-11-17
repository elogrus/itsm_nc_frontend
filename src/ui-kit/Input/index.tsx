// Input.tsx
import { defineComponent, computed, type ExtractPublicPropTypes } from 'vue'
import { oneOfProp } from 'vue-ts-types'
import styles from './index.module.css'

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

const Input = defineComponent({
  name: 'Input',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    /** Подпись над полем */
    caption: { type: String, default: '' },
    type: { type: String, default: 'text' },
    autocomplete: { type: String, default: undefined },
    /** Флаг ошибки — если true, обводка станет красной */
    error: { type: Boolean, default: false },
    /** Текст ошибки — тоже включает "красное" состояние */
    errorMessage: { type: String, default: '' },
    size: oneOfProp(['sm', 'md', 'lg'] as const).withDefault('md'),
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, slots }) {
    const id = `input-${Math.random().toString(36).slice(2, 9)}`

    const hasError = computed(() => props.error || props.errorMessage.length > 0)

    const onInput = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    return () => (
      <div class={cx(styles.input, styles[props.size])}>
        {props.caption && (
          <label class={styles.caption} for={id}>
            {props.caption}
          </label>
        )}

        <input
          {...attrs}
          id={id}
          class={cx(
            styles.field,
            hasError.value && styles.fieldError,
            attrs.class as string | undefined,
          )}
          type={props.type}
          autocomplete={props.autocomplete}
          value={props.modelValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onInput={onInput}
        />

        {hasError.value && (props.errorMessage || slots.errorMessage) && (
          <span class={styles.errorText}>{slots.errorMessage?.() ?? props.errorMessage}</span>
        )}
      </div>
    )
  },
})

export type InputComponentProps = ExtractPublicPropTypes<typeof Input>
export default Input
