import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { registerComponents } from './components/register'
import { registerLayouts } from './layouts/register'
import { registerViews } from './views/register'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as RiIcons from 'oh-vue-icons/icons/ri'

const Ri = Object.values({ ...RiIcons })
addIcons(...Ri)

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(createPinia())
app.use(router)
await registerLayouts(app)
await registerComponents(app)
await registerViews(app)

app.mount('#app')
