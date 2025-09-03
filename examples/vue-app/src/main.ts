import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { GraphQLApi, RestApi, setApi } from 'fast-ui-builder';

setApi(new RestApi('http://localhost:8000/api'));

createApp(App).mount('#app')
