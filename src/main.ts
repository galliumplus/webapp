import { createApp } from 'vue'
import App from './App.vue'
import { globalServices } from '@/services/global'
import router from './router'
import dayjs from 'dayjs'
import 'dayjs/locale/fr.js'
import '@/assets/style/global.scss'

dayjs.locale('fr')

const app = createApp(App)

app.use(router)
app.use(globalServices)
app.mount('#app')
