import { createApp } from 'vue';
import { router } from './components/router/router';
import './style.css';
import App from './App.vue';
import { store } from './store/store';

import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faXmark, faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faHeart);

const app = createApp(App);

app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
