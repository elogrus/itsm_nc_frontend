import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  setup() {
    return () => <NButton>{{ default: () => 'my button' }}</NButton>
  },
})
