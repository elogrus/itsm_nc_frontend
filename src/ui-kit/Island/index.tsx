import { defineComponent, type PropType } from 'vue'
import styles from './index.module.css'

type Tag = 'div' | 'section' | 'article' | 'aside' | 'main'

export default defineComponent({
  name: 'Island',
  props: {
    /** HTML-тег корневого элемента */
    as: {
      type: String as PropType<Tag>,
      default: 'div',
    },
    /** Дополнительные CSS-классы */
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const Tag = props.as
      return (
        <Tag {...attrs} class={[styles.island, props.class]}>
          {slots.default?.()}
        </Tag>
      )
    }
  },
})
