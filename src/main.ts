import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHeadCore, VueHeadMixin } from '@unhead/vue'
import router from './router'
import App from './App.vue'
import './assets/styles/base.scss'

const app = createApp(App)
const head = createHeadCore()

app.use(createPinia())
app.use(head as any)
app.mixin(VueHeadMixin)
app.use(router)

app.mount('#app')
