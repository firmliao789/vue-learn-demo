import Vue from 'vue';
import myPlugin from '../../plugins/myPlugin';

Vue.use(myPlugin);

const vue = new Vue({});


console.log('vue', vue);