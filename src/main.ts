import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHeadCore } from '@unhead/vue'
import router from './router'
import App from './App.vue'
import './assets/styles/base.scss'

const app = createApp(App)
const head = createHeadCore()

const headPlugin = {
  install() {
    app.config.globalProperties.$unhead = head
    app.config.globalProperties.$head = head
    app.provide('usehead', head)
  },
}

app.use(createPinia())
app.use(headPlugin)
app.use(router)

app.mount('#app')
