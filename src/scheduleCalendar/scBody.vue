<template>
    <div class="schedule-calendar-body">
        <sc-week :startWeek="startWeek"></sc-week>
        <sc-month :year="year"
                  :month="month"
                  :startWeek="startWeek"
                  :data="data"></sc-month>
    </div>
</template>
<script>
import scWeek from './scWeek'
import scMonth from './scMonth'

export default {
    components: {
        scWeek,
        scMonth
    },
    props: {
        year: Number,
        month: Number,
        startWeek: Number,
        data: Array
    },
}
</script>
<style lang="less">
@import './variables.less';

.schedule-calendar- {
    &body {
        position: relative;
        flex: 1;
        width: 100%;
        overflow: hidden;
        background: @sc-body-color;
    }
}
</style>
