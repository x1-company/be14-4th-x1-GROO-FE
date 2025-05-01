import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import mitt from 'mitt'

const emitter = mitt()
const app = createApp(App)
app.use(Vue3Lottie)
app.config.globalProperties.emitter = emitter
app.use(router)
app.mount('#app')
