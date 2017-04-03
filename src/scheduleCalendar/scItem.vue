<template>
    <div class="schedule-calendar-detail-item"
         draggable
         @dragstart="onDrag">
        <span class="schedule-calendar-detail-text">{{item.text}}</span>
    </div>
</template>
<script>
export default {
    props: {
        item: Object,
        date: Date,
        type: String,
    },
    methods: {
        onDrag(e) {
            this.$emit('item-dragstart', e, this.item, this.date, this.type)
        }
    }
}
</script>
<style lang="less">
@import './variables.less';

.schedule-calendar-detail-item {
    padding: 0 5px;
    margin: 3px 6px 0;
    font-size: 12px;
    color: #fff;
    line-height: 2em;
    border-radius: 2px;
    background: @sc-primary-color;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: .2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 3px 8px rgba(0, 0, 0, .2), 0 -3px 8px rgba(0, 0, 0, .2)
    }
}
</style>
