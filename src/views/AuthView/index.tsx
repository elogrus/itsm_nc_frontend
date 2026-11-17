import { defineComponent, ref } from 'vue'
import Button from '@/ui-kit/Button/Button'
import Input from '@/ui-kit/Input'
import Island from '@/ui-kit/Island'
import Text from '@/ui-kit/Text'
import styles from './index.module.css'

export default defineComponent({
  name: 'AuthView',
  setup() {
    const login = ref('')
    const password = ref('')
    const loginError = ref('')
    const passwordError = ref('')

    const onSubmit = (event: Event) => {
      event.preventDefault()

      loginError.value = login.value.trim() ? '' : 'Введите логин'
      passwordError.value = password.value ? '' : 'Введите пароль'

      if (loginError.value || passwordError.value) return

      // TODO: отправка данных на сервер
    }

    return () => (
      <div class={styles.wrapper}>
        <Island class={styles.island}>
          <section class={styles.left}>
            <img class={styles.logo} src="/assets/logo.png" alt="ITSM NC" />

            <div class={styles.intro}>
              <Text variant="heading1">Управление IT-сервисами</Text>
              <Text variant="body1" class={styles.introText}>
                Заявки, активы и процессы вашей
                <br />
                компании в одной системе.
              </Text>
            </div>
          </section>

          <section class={styles.right}>
            <Text variant="heading2" as="h2" class={styles.title}>
              Вход в систему
            </Text>

            <form class={styles.form} onSubmit={onSubmit} novalidate>
              <Input
                caption="Логин"
                modelValue={login.value}
                onUpdate:modelValue={(value: string) => {
                  login.value = value
                  if (loginError.value) loginError.value = ''
                }}
                errorMessage={loginError.value}
                autocomplete="username"
              />

              <Input
                caption="Пароль"
                modelValue={password.value}
                onUpdate:modelValue={(value: string) => {
                  password.value = value
                  if (passwordError.value) passwordError.value = ''
                }}
                errorMessage={passwordError.value}
                type="password"
                autocomplete="current-password"
              />

              <Button type="submit" variant="primary" class={styles.submit}>
                Войти
              </Button>
            </form>

            <a class={styles.link} href="#">
              Забыли пароль? Обратитесь к администратору
            </a>
          </section>
        </Island>
      </div>
    )
  },
})
