import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <header style="position: fixed; opacity: 0.5; width: 100%;">
          <nav style="padding: 10px 20px; background-color: #696969; color: #FFFFFF; display: flex; gap: 20px;">
            <RouterLink style="color: #FFFFFF" to="/">
              Главная
            </RouterLink>
            <RouterLink style="color: #FFFFFF" to="/cmp">
              Компоненты
            </RouterLink>
          </nav>
        </header>

        <main>
          <RouterView />
        </main>
      </>
    )
  },
})
