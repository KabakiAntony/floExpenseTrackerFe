import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')

// app.config.globalProperties.$api = "http://127.0.0.1:5000/"
// store.$api = "http://127.0.0.1:5000/"
app.config.globalProperties.$api = "https://flo-expense-tracker.herokuapp.com/"
store.$api = "https://flo-expense-tracker.herokuapp.com/"
