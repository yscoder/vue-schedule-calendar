import Vue from 'vue'

/**
 * 事件总线
 */
export const EventBus = new Vue()

/**
 * 是否闰年
 * @param {*} year
 */
const isLeap = year => (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0

/**
 * 计算某月天数
 * @param {*} param0 { year, month }
 */
export const calcDays = ({ year, month }) => {
    let num = 31

    switch (month + 1) {
        case 2:
            num = isLeap(year) ? 29 : 28
            break
        case 4:
        case 6:
        case 9:
        case 11:
            num = 30
            break
    }
    return num
}

const siblingsMonth = (y, m, n) => {
    const date = new Date(y, m, 1)
    date.setMonth(m + n)
    return {
        year: date.getFullYear(),
        month: date.getMonth()
    }
}

/**
 * 上一月的年份和月份
 * @param {*} year
 * @param {*} month
 */
export const calcPrevMonth = (year, month) => siblingsMonth(year, month, -1)

/**
 * 下一月的年份和月份
 * @param {*} year
 * @param {*} month
 */
export const calcNextMonth = (year, month) => siblingsMonth(year, month, 1)

/**
 * 某月第一天是星期几
 * @param {*} year
 * @param {*} month
 */
const firstWeek = (year, month) => new Date(year, month, 1).getDay()

export const PREV_DATE_TYPE = 'prev'
export const CURRENT_DATE_TYPE = 'current'
export const NEXT_DATE_TYPE = 'next'

/**
 * 月历
 * @param {*} year
 * @param {*} month
 * @param {*} startWeek
 */
export const monthlyCalendar = (year, month, startWeek) => {
    const result = []
    const curMonth = {
        year,
        month
    }
    const days = calcDays(curMonth)
    const prevMonth = calcPrevMonth(year, month)
    const prevDays = calcDays(prevMonth)
    const prevOver = (firstWeek(year, month) || 7) - startWeek
    const nextMonth = calcNextMonth(year, month)

    for (let p = prevDays - prevOver + 1; p <= prevDays; p++) {
        result.push({
            date: new Date(prevMonth.year, prevMonth.month, p),
            type: PREV_DATE_TYPE
        })
    }

    for (let c = 1; c <= days; c++) {
        result.push({
            date: new Date(curMonth.year, curMonth.month, c),
            type: CURRENT_DATE_TYPE
        })
    }

    for (let n = 1, nl = 42 - result.length; n <= nl; n++) {
        result.push({
            date: new Date(nextMonth.year, nextMonth.month, n),
            type: NEXT_DATE_TYPE
        })
    }

    return result
}

const tryParse = obj => (typeof obj === 'string' ? new Date(obj) : obj)

/**
 * 是否是同一天
 * @param {*} one
 * @param {*} two
 */
export const isSameDay = (one, two) => {
    const oneDate = tryParse(one)
    const twoDate = tryParse(two)
    return (
        oneDate.getDate() === twoDate.getDate() &&
        oneDate.getMonth() === twoDate.getMonth() &&
        oneDate.getFullYear() === twoDate.getFullYear()
    )
}

const fillZero = value => (value < 10 ? `0${value}` : value)
export const format = (date, exp = 'yyyy年MM月dd日') => {
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()

    return exp
        .replace('yyyy', y)
        .replace('MM', fillZero(m))
        .replace('dd', fillZero(d))
}

// 记录一些公共数据
export const Store = {
    hasExpand: false // 当前是否有展开的单元格
}
