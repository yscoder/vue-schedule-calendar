import calendar from './calendar'

export default calendar

if (window.Vue) {
    Vue.component(calendar.name, calendar)
}
