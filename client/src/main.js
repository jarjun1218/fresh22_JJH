import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './axios'
import store from './store'

// createApp(App).use(router).mount('#app')
createApp(App).use(store).use(router).mount('#app')




