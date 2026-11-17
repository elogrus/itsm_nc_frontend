import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/ui-kit/Button/Button'
import Island from '@/ui-kit/Island'
import PinInput from '@/ui-kit/PinInput'
import Text from '@/ui-kit/Text'
import styles from './index.module.css'

export default defineComponent({
  name: 'ConfirmView',
  setup() {
    const router = useRouter()
    const code = ref('')
    const codeError = ref('')

    const onSubmit = (event: Event) => {
      event.preventDefault()

      codeError.value = code.value.length === 6 ? '' : 'Введите шестизначный код'

      if (codeError.value) return

      // TODO: отправка кода на сервер
    }

    const onBack = () => {
      router.push({ name: 'auth' })
    }

    return () => (
      <div class={styles.wrapper}>
        <Island class={styles.island}>
          <img class={styles.logo} src="/assets/logo.png" alt="ITSM NC" />

          <div class={styles.intro}>
            <Text variant="heading2" as="h2" class={styles.title}>
              Подтверждение входа
            </Text>
            <Text variant="body1" class={styles.description}>
              Введите шестизначный код из приложения-аутентификатора
            </Text>
          </div>

          <form class={styles.form} onSubmit={onSubmit} novalidate>
            <PinInput
              modelValue={code.value}
              length={6}
              errorMessage={codeError.value}
              autofocus
              onUpdate:modelValue={(value: string) => {
                code.value = value
                if (codeError.value) codeError.value = ''
              }}
            />

            <Button type="submit" variant="primary" class={styles.button}>
              Подтвердить
            </Button>

            <Button type="button" variant="secondary" class={styles.button} {...{ onClick: onBack }}>
              Назад
            </Button>
          </form>
        </Island>
      </div>
    )
  },
})
