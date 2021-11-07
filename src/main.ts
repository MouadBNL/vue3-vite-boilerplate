import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

import { registerModules } from './register-modules'
import authModule from './modules/auth'
registerModules({
    auth: authModule,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')