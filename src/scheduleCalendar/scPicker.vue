<template>
    <div class="schedule-calendar-picker-list"
         v-if="visible">
        <div class="schedule-calendar-picker-col"
             style="width: 60%">
            <ul>
                <li v-for="n in endYear - beginYear"
                    :class="{ active: beginYear + n === year}"
                    @click="selectYear(beginYear + n)">{{beginYear + n}}</li>
            </ul>
        </div>
        <div class="schedule-calendar-picker-col"
             style="width: 40%">
            <ul>
                <li v-for="n in 12"
                    :class="{active: n === month + 1}"
                    @click="selectMonth(n - 1)">{{n}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        beginYear: {
            type: Number,
            default: 1900
        },
        endYear: {
            type: Number,
            default: 2100
        },
        year: Number,
        month: Number,
        visible: Boolean
    },
    methods: {
        selectYear(year) {
            this.$parent.updateValue(year)
        },
        selectMonth(month) {
            this.$parent.updateValue(this.year, month)
        }
    }
}
</script>
<style lang="less">
@import './variables.less';

.schedule-calendar-picker- {
    &list {
        position: absolute;
        top: 100%;
        left: 0;
        display: flex;
        width: 100%;
        font-size: @sc-base-font-size;
        color: @sc-gray-color;
        background: @sc-body-color;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    &col {
        overflow: hidden;
        height: @sc-picker-height;
        padding-bottom: 100%;
        &:first-child {
            border-right: 1px solid @sc-border-color;
        }
        ul,
        li {
            list-style: none;
        }
        ul {
            padding: 0;
            margin: 0;
        }
        li {
            padding: 0 12px;
            line-height: 30px;
            cursor: pointer;
            &:hover {
                background: lighten(@sc-primary-light-color, 8%);
            }
            &.active {
                color: #fff;
                background: @sc-primary-color;
            }
        }
        &:hover {
            overflow-y: auto;
        }
    }
}
</style>
