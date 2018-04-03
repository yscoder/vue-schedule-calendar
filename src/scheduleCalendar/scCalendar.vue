<template>
    <div class="schedule-calendar">
        <sc-header :year="year"
                   :month="month"
                   @updateValue="updateView"></sc-header>
        <div class="schedule-calendar-body">
            <sc-week :startWeek="startWeek"></sc-week>
            <sc-month :year="year"
                      :month="month"
                      :startWeek="startWeek"
                      :data="keepData"
                      :itemRender="itemRender"></sc-month>
        </div>
    </div>
</template>
<script>
import { EventBus } from './utils'
import scHeader from './scHeader'
import scWeek from './scWeek'
import scMonth from './scMonth'

export default {
    name: 'schedule-calendar',
    components: {
        scHeader,
        scWeek,
        scMonth,
    },
    props: {
        startMonth: String,
        startWeek: {
            type: Number,
            default: 1
        },
        originData: {
            type: Array,
            default: []
        },
        itemRender: Function
    },
    data() {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            keepData: [...this.originData],
            dragItem: null
        }
    },
    watch: {
        originData(data) {
            console.log(data)
            if (data.length) {
                this.keepData = [...data]
            }
        }
    },
    methods: {
        updateView(year, month) {
            this.year = year
            this.month = month
        },
        cellDragenter(e, date, type, index) {

        },
        itemDragstart(e, item, date, type) {
            this.dragItem = item
        },
        itemDrop(e, date, type, index) {
            if (!this.dragItem) return
            this.keepData.find(item => item.id === this.dragItem.id).date = date
        }
    },
    created() {
        EventBus.$on('cell-dragenter', this.cellDragenter)
        EventBus.$on('item-dragstart', this.itemDragstart)
        EventBus.$on('item-drop', this.itemDrop)
    },
    destoryed() {
        EventBus.$off('cell-dragenter', this.cellDragenter)
        EventBus.$off('item-dragstart', this.itemDragstart)
        EventBus.$off('item-drop', this.itemDrop)
    }
}
</script>
<style lang="less">
@import './variables.less';

.schedule- {
    &calendar {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        color: @sc-base-color;
        font-size: @sc-base-font-size;
        box-shadow: @sc-box-shadow;

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        button {
            border: 0;
            outline: none;
            cursor: pointer;
            background: transparent;
        }

        &-body {
            position: relative;
            flex: 1;
            width: 100%;
            overflow: hidden;
            background: @sc-body-color;
        }
    }
}
</style>
