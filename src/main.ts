import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { registerComponents } from './components/register'
import { registerLayouts } from './layouts/register'

const app = createApp(App)

app.use(createPinia())
app.use(router)
await registerLayouts(app)
await registerComponents(app)

app.mount('#app')
