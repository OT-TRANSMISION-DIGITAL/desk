import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

import 'flowbite/dist/flowbite.min.css';
import './style.css'

createApp(App)
.use(router)
.mount('#app')
