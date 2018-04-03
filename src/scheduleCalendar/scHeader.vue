<template>
    <header class="schedule-calendar-hd">
        <button type="button"
                class="schedule-calendar-arrow double-arrow"
                @click="prevYear">&lt;&lt;</button>
        <button type="button"
                class="schedule-calendar-arrow"
                @click="prevMonth">&lt;</button>
        <div class="schedule-calendar-picker" ref="picker">
            <div role="button"
                 class="schedule-calendar-display"
                 @click="pickerVisible = !pickerVisible">{{year}} 年 {{month + 1}} 月</div>
            <sc-picker :visible="pickerVisible"
                       :year="year"
                       :month="month"></sc-picker>
        </div>
        <button type="button"
                class="schedule-calendar-arrow"
                @click="nextMonth">&gt;</button>
        <button type="button"
                class="schedule-calendar-arrow double-arrow"
                @click="nextYear">&gt;&gt;</button>
    </header>
</template>
<script>
import { calcPrevMonth, calcNextMonth } from './utils'
import scPicker from './scPicker'

export default {
    components: {
        scPicker
    },
    props: {
        year: Number,
        month: Number
    },
    data() {
        return {
            pickerVisible: false
        }
    },
    computed: {

    },
    methods: {
        updateValue(year, month = this.month) {
            this.$emit('updateValue', year, month)
        },
        prevYear() {
            this.updateValue(this.year - 1)
        },
        nextYear() {
            this.updateValue(this.year + 1)
        },
        prevMonth() {
            const { year, month } = calcPrevMonth(this.year, this.month)
            this.updateValue(year, month)
        },
        nextMonth() {
            const { year, month } = calcNextMonth(this.year, this.month)
            this.updateValue(year, month)
        },
        clickOutSide(e) {
            if(this.pickerVisible && !this.$refs.picker.contains(e.target)) {
                this.pickerVisible = false
            }
        }
    },
    created() {
        document.addEventListener('mouseup', this.clickOutSide)
    },
    destoryed() {
        document.removeEventListener('mouseup', this.clickOutSide)
    }
}
</script>
<style lang="less">
@import './variables.less';

.schedule-calendar- {
    &hd {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        height: @sc-header-height;
        padding: @sc-header-padding 0;
        font-size: @sc-header-fs;
        line-height: @sc-header-height - @sc-header-padding * 2;
        background: @sc-primary-color;
        color: @sc-body-color;
        user-select: none;
    }
    &arrow {
        font-family: consolas;
        font-size: inherit;
        font-weight: 400;
        padding: 0 10px;
        height: 100%;
        color: @sc-primary-light-color;

        &:active {
            background: darken(@sc-primary-dark-color, 15%);
        }
        &.double-arrow {
            letter-spacing: -3px;
        }
    }
    &picker {
        position: relative;
        z-index: 20;
        padding: 4px 5px;
        height: 100%;
    }
    &arrow,
    &display {
        border-radius: 2px;
        transition: 0.2s ease-in-out;
        &:hover {
            color: #fff;
            background: @sc-primary-dark-color;
        }
    }
    &display {
        padding: 0 10px;
        line-height: 32px;
        cursor: pointer;
    }
}
</style>
