// PinInput.tsx
import { computed, defineComponent, nextTick, ref, watch, type ExtractPublicPropTypes } from 'vue'
import styles from './index.module.css'

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

const PinInput = defineComponent({
  name: 'PinInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    length: { type: Number, default: 6 },
    caption: { type: String, default: '' },
    error: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'complete'],
  setup(props, { attrs, emit }) {
    const inputs = ref<Array<HTMLInputElement | null>>([])
    const id = `pin-${Math.random().toString(36).slice(2, 9)}`

    // Внутреннее состояние ячеек — сохраняет позиции (включая «дырки»)
    const cells = ref<string[]>(Array.from({ length: props.length }, () => ''))
    // true — если изменение cells пришло изнутри (наш emit), чтобы watch не перезаписал
    let internalUpdate = false

    const hasError = computed(() => props.error || props.errorMessage.length > 0)

    // Синхронизация извне (v-model / сброс формы)
    watch(
      () => props.modelValue,
      (val) => {
        if (internalUpdate) {
          internalUpdate = false
          return
        }
        const arr = Array.from({ length: props.length }, () => '')
        val.split('').forEach((ch, i) => {
          if (i < props.length) arr[i] = ch
        })
        cells.value = arr
      },
      { immediate: true },
    )

    // Изменение length
    watch(
      () => props.length,
      (len) => {
        const arr = cells.value.slice(0, len)
        while (arr.length < len) arr.push('')
        cells.value = arr
      },
    )

    const emitValue = () => {
      const compact = cells.value.join('')
      internalUpdate = true
      emit('update:modelValue', compact)
      if (cells.value.every((c) => c !== '')) emit('complete', compact)
    }

    const setCell = (i: number, char: string) => {
      if (i < 0 || i >= props.length) return
      if (cells.value[i] === char) return
      const next = [...cells.value]
      next[i] = char
      cells.value = next
      emitValue()
    }

    const focusIndex = (i: number) => {
      const clamped = Math.max(0, Math.min(props.length - 1, i))
      nextTick(() => inputs.value[clamped]?.focus())
    }

    const onInput = (i: number, e: Event) => {
      const el = e.target as HTMLInputElement
      const digit = el.value.replace(/\D/g, '').slice(-1)
      if (!digit) {
        setCell(i, '')
        return
      }
      setCell(i, digit)
      // сброс DOM-значения (защита от "55" при быстром вводе)
      el.value = digit
      focusIndex(i + 1)
    }

    const onKeyDown = (i: number, e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault()
        if (cells.value[i]) {
          // в текущей ячейке есть цифра — стираем её, фокус не двигаем
          setCell(i, '')
        } else if (i > 0) {
          // ячейка пуста — стираем предыдущую и переходим назад
          setCell(i - 1, '')
          focusIndex(i - 1)
        }
      } else if (e.key === 'Delete') {
        e.preventDefault()
        setCell(i, '')
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        focusIndex(i - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        focusIndex(i + 1)
      }
    }

    const onPaste = (i: number, e: ClipboardEvent) => {
      e.preventDefault()
      const text = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '')
      if (!text) return
      const next = [...cells.value]
      let pos = i
      for (const ch of text) {
        if (pos >= props.length) break
        next[pos] = ch
        pos++
      }
      cells.value = next
      emitValue()
      focusIndex(pos)
    }

    const setInputRef = (el: Element | null, i: number) => {
      inputs.value[i] = el as HTMLInputElement | null
    }

    return () => (
      <div class={styles.wrap}>
        {props.caption && (
          <label class={styles.caption} for={`${id}-0`}>
            {props.caption}
          </label>
        )}

        <div
          {...attrs}
          class={cx(
            styles.fields,
            props.disabled && styles.fieldsDisabled,
            attrs.class as string | undefined,
          )}
        >
          {cells.value.map((digit, i) => (
            <input
              key={i}
              ref={(el) => setInputRef(el as Element | null, i)}
              id={`${id}-${i}`}
              class={cx(styles.cell, hasError.value && styles.cellError)}
              type="text"
              inputmode="numeric"
              autocomplete={i === 0 ? 'one-time-code' : 'off'}
              maxlength={1}
              value={digit}
              disabled={props.disabled}
              autofocus={props.autofocus && i === 0}
              onInput={(e) => onInput(i, e)}
              onKeydown={(e) => onKeyDown(i, e)}
              onPaste={(e) => onPaste(i, e)}
              onFocus={(e) => (e.target as HTMLInputElement).select()}
            />
          ))}
        </div>

        {hasError.value && props.errorMessage && (
          <span class={styles.errorText}>{props.errorMessage}</span>
        )}
      </div>
    )
  },
})

export type PinInputComponentProps = ExtractPublicPropTypes<typeof PinInput>
export default PinInput
