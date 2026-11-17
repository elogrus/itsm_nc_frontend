import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    return () => (
      <section>
        <h1>Главная</h1>
        <p>Добро пожаловать в ITSM NC</p>
      </section>
    )
  },
})
