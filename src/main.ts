import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'
import 'dayjs/locale/fr.js'
import { createApp } from 'vue'
import '@/assets/style/fonts.scss'
import '@/assets/style/global.scss'
import { globalServices } from '@/services/global'

dayjs.locale('fr')

const app = createApp(App)

app.use(router)
app.use(globalServices)
app.mount('#app')
