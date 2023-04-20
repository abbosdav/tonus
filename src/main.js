import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';


//core
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";     

//icons
import "primeicons/primeicons.css";

createApp(App)
    .use(ConfirmationService)
    .use(ToastService)
    .use(PrimeVue)
    .use(store)
    .use(router)
    .mount('#app')
