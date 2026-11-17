import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'

import App from '../App'
import HomeView from '@/views/HomeView'

describe('App', () => {
  it('renders navigation and the home page', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: HomeView }],
    })

    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    expect(wrapper.text()).toContain('Главная')
    expect(wrapper.text()).toContain('Добро пожаловать в ITSM NC')
  })
})
