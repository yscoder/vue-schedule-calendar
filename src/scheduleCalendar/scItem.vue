<script>
export default {
    props: {
        item: Object,
        date: Date,
        type: String,
        itemRender: Function
    },
    methods: {
        onDrag(e) {
            this.$emit('item-dragstart', e, this.item, this.date, this.type)
        }
    },
    render(h) {
        return h('div', {
            attrs: {
                class: 'schedule-calendar-detail-item',
                draggable: true
            },
            on: {
                dragstart: this.onDrag,
            }
        }, this.itemRender ? [this.itemRender(this.item)] : [h('span', this.item.text)])
    }
}
</script>
<style lang="less">
@import './variables.less';

.schedule-calendar-detail-item {
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

    > * {
        padding: 0 5px;
    }
}
</style>
