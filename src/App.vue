<template>
    <div id="app"
         class="demo">
        <h1 class="demo-title">Vue Schedule Calendar</h1>
        <div class="demo-container">
            <schedule-calendar :events="events"
                               :dateItemRender="itemRender"
                               @event-dragend="changeDate"></schedule-calendar>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            events: [
                {
                    id: 111,
                    date: '2017-04-03',
                    text: '老铁，扎心了',
                    status: 1
                },
                {
                    id: 222,
                    date: '2017-04-03',
                    text: '来啊，互相伤害',
                    status: 2
                },
                {
                    id: 333,
                    date: '2017-04-03',
                    text: '这个人好会装逼',
                    status: 3
                },
                {
                    id: 444,
                    date: '2017-04-03',
                    text: '那你很棒哟',
                    status: 4
                },
                {
                    id: 555,
                    date: '2017-04-03',
                    text: '我表示很无奈',
                    status: 5
                },
                {
                    id: 666,
                    date: '2017-04-09',
                    text: '老铁，扎心了',
                    status: 6
                },
                {
                    id: 777,
                    date: '2017-04-09',
                    text: '来啊，互相伤害',
                    status: 7
                },
                {
                    id: 888,
                    date: '2017-04-09',
                    text: '这个人好会装逼',
                    status: 8
                },
                {
                    id: 999,
                    date: '2017-04-09',
                    text: '那你很棒哟',
                    status: 9
                },
                {
                    id: 1010,
                    date: '2017-04-09',
                    text: '我表示很无奈',
                    status: 10
                }
            ],
            itemRender(item) {
                const h = this.$createElement
                return h('span', 'CustomRender：' + item.text)
            },
        }
    },
    methods: {
        changeDate(e, item, date) {
            const updateIndex = this.events.findIndex(ele => ele.id === item.id)
            this.$set(this.events, updateIndex, {
                ...this.events[updateIndex],
                date
            })
        }
    },
    created() {
        // 显示为当月的数据
        const now = new Date()
        this.events = this.events.map(item => {
            const d = item.date.split('-')[2]
            item.date = `${now.getFullYear()}-${now.getMonth() + 1}-${d}`
            return item
        })
    }
}
</script>
<style lang="less">
html {
    background: #eee;
}

body,
html {
    height: 100%;
    overflow: hidden;
}

body {
    margin: 0;
}

.demo {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 30px 30px;
    box-sizing: border-box;
}

.demo-title {
    text-align: center;
}

.demo-container {
    flex: 1;
}

</style>
