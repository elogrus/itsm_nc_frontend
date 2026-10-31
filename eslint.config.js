import pluginVue from 'eslint-plugin-vue'

export default [
  // ... другие конфиги (например, от Nuxt или ваши собственные)
  ...pluginVue.configs['flat/essential'], // или другой пресет (recommended, strongly-recommended)
  {
    rules: {
      // Отключаем правило, требующее многословных имен компонентов
      'vue/multi-word-component-names': 'off',
    },
  },
]
