import { defineComponent } from 'vue'
import Button from './ui-kit/Button/Button'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div id="app">
        <h1>Hello TSX + Pinia</h1>
        <Button>asd</Button>
      </div>
    )
  },
})
