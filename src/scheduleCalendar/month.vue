<template>
    <div class="schedule-calendar-month"
         :class="{ [animationClass]: animated }"
         @animationend="removeAnimation">
        <date-cell v-for="(item, index) in days"
                   :date="item.date"
                   :type="item.type"
                   :data="data"
                   :index="index"
                   :draggedIndex="draggedIndex"
                   :itemRender="itemRender"
                   @highlight="highlight"
                   :key="index"></date-cell>
    </div>
</template>
<script>
import { monthlyCalendar } from './utils'
import dateCell from './dateCell'

export default {
    components: {
        dateCell
    },
    props: {
        year: Number,
        month: Number,
        startWeek: Number,
        data: Array,
        itemRender: Function
    },
    data() {
        return {
            viewTransition: 'sc-moveTo',
            draggedIndex: -1,
            direction: 'Left',
            animated: false
        }
    },
    computed: {
        days() {
            return monthlyCalendar(this.year, this.month, this.startWeek)
        },
        animationClass() {
            return this.viewTransition + this.direction
        },
        mDate() {
            return new Date(this.year, this.month, 0)
        }
    },
    methods: {
        removeAnimation() {
            this.animated = false
        },
        addAnimation(val, old) {
            if (val !== old) {
                this.animated = true
            }
        },
        highlight(index) {
            this.draggedIndex = index
        }
    },
    watch: {
        mDate(val, old) {
            if (old) {
                if (val < old) {
                    this.direction = 'Right'
                }
                if (val > old) {
                    this.direction = 'Left'
                }
            }

            if (val !== old) {
                this.animated = true
            }
        }
    },
}
</script>
<style lang="less">
@import "./variables.less";

.schedule-calendar- {
    &month {
        position: absolute;
        top: @sc-week-height;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-wrap: wrap; // transition: transform .3s ease-in-out;
    }
}

.sc-moveToLeft {
    animation: scMoveToLeft .3s both;
}

.sc-moveToRight {
    animation: scMoveToRight .3s both;
}

@keyframes scMoveToLeft {
    from {
        transform: translate3d(50%, 0, 0);
        visibility: visible;
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes scMoveToRight {
    from {
        transform: translate3d(-50%, 0, 0);
        visibility: visible;
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}

</style>
