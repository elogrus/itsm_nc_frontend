// Text.tsx
import { computed, defineComponent, h, type ExtractPublicPropTypes, type PropType } from 'vue'
import { oneOfProp } from 'vue-ts-types'
import styles from './index.module.css'

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

const TAG_OPTIONS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label'] as const
type TextTag = (typeof TAG_OPTIONS)[number]

/** Тег по умолчанию для каждого варианта (семантика из коробки) */
const DEFAULT_TAG: Record<'heading1' | 'heading2' | 'body1' | 'body2', TextTag> = {
  heading1: 'h1',
  heading2: 'h2',
  body1: 'p',
  body2: 'p',
}

const Text = defineComponent({
  name: 'Text',
  inheritAttrs: false,
  props: {
    variant: oneOfProp(['heading1', 'heading2', 'body1', 'body2'] as const).withDefault('body2'),
    /** Переопределить HTML-тег, напр. heading1 как `div` или body1 как `span` */
    as: {
      type: String as PropType<TextTag>,
      default: undefined,
      validator: (v: string) => (TAG_OPTIONS as readonly string[]).includes(v),
    },
  },
  setup(props, { attrs, slots }) {
    const tag = computed<TextTag>(() => props.as ?? DEFAULT_TAG[props.variant])

    return () =>
      h(
        tag.value,
        {
          ...attrs,
          class: cx(styles.text, styles[props.variant], attrs.class as string | undefined),
        },
        slots.default?.(),
      )
  },
})

export type TextComponentProps = ExtractPublicPropTypes<typeof Text>
export default Text
