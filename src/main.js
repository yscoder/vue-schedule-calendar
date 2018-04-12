import Vue from 'vue'
import App from './App.vue'
import scheduleCalendar from './scheduleCalendar'

Vue.component(scheduleCalendar.name, scheduleCalendar)

new Vue({
    el: '#app',
    render: h => h(App)
})
