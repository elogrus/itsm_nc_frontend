import Button from '@/ui-kit/Button/Button'
import Input from '@/ui-kit/Input'
import Text from '@/ui-kit/Text'
import PinInput from '@/ui-kit/PinInput'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComponentsView',
  setup() {
    return () => (
      <div>
        <h1>Hello TSX + Pinia</h1>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Input errorMessage="asdasd" placeholder="Привет" />
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <Text variant="heading1">Заголовок 1</Text>
          <Text variant="heading2">Заголовок 2</Text>
          <Text variant="body1">Основной текст 1</Text>
          <Text variant="body2">Основной текст 2</Text>

          <Text variant="heading1" as="h2">
            Визуально h1, семантически h2
          </Text>
          <Text variant="body2" as="span">
            Инлайн-текст 18px
          </Text>
        </div>
        <PinInput errorMessage="error message" />
      </div>
    )
  },
})
