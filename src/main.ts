import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import '@/utils/rem'
import '@/style/index.less'
// import '@/utils/permission'

import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
