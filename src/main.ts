import './assets/tailwind.css'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from 'vue-query';
import VueTelInput from 'vue3-tel-input'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"
import ImageUploadVue from 'image-upload-vue'

const VueTelInputOptions = {
    mode: "international",
    onlyCountries: ['EG', 'SA', "AF", "AL", "AS"]
  }

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(VueTelInput, VueTelInputOptions);
app.use(ImageUploadVue)
app.use(VueQueryPlugin);
app.use(createPinia())
app.mount('#app')