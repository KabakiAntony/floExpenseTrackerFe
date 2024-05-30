import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')

app.config.globalProperties.$api = "https://floexpensetracker.kabakiantony.net/"
store.$api = "https://floexpensetracker.kabakiantony.net/"
