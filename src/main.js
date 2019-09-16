import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import VueScrollTo from 'vue-scrollto'
import VueI18n from 'vue-i18n'

import Translations from './tr.js'

import BootstrapVue from 'bootstrap-vue'

import VueAnalytics from 'vue-analytics'

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Notifications from './components/Notifications.vue'
import Pricing from './components/Pricing.vue'
import TermsOfService from './components/TermsOfService.vue'
import About from './components/About.vue'
import Dashboard from './components/Dashboard.vue'
import MyBooks from './components/MyBooks.vue'
import NewBook from './components/NewBook.vue'
import BookInfo from './components/BookInfo.vue'
import Admin from './components/Admin.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'

import moment from 'moment'

import Session from './services/session'
import Locale from './services/locale'

//FontAwesome!
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.filter('prettyDate', (val) => {
  if (moment(val).isSame(new Date(), 'day')) {
    return 'сегодня в ' + moment(val).format('HH:mm');
  }

  return moment(val).format('DD.MM.YYYY HH:mm');
});

Vue.filter('subDate', (val) => {
  return moment(val).format('DD.MM.YYYY');
});


Vue.filter('fitTitle', (val) => {
  if (val.length <= 18) return val;

  return val.substring(0,20) + '...';
})

moment.locale('ru');

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.use(BootstrapVue);

Vue.use(VueScrollTo);

const routes = [{
  path: "/home",
  component: Home
},
{
  path: "/login",
  component: Login
},
{
  path: "/register",
  component: Register
},
{
  path: "/notifications",
  component: Notifications
},
{
  path: "/pricing",
  component: Pricing
},
{
  path: "/termsofservice",
  component: TermsOfService
},
{
  path: "/dashboard",
  component: Dashboard
},
{
  path: '/book/:bookID',
  name: 'book',
  component: BookInfo
},
{
  path: "/about",
  component: About
},
{
  path: "/mybooks",
  component: MyBooks
},
{
  path: '/newbook',
  component: NewBook
},
{
  path: '/acpanel',
  component: Admin
},
{
  path: '/privacy-policy',
  component: PrivacyPolicy
},
{
  path: '*',
  redirect: '/home'
}
];

const router = new VueRouter({
  routes
});

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: Locale.getLocale(), 
  messages: Translations.messages, 
})

Vue.use(VueAnalytics, {
  id: 'UA-122969989-1',
  router
});


Session.init(function() {
  new Vue({
    router,
    i18n,
    render: (h) => h(App)
  }).$mount("#app");
});
