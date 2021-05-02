import moment from "moment";

import { DateData } from './DateData';
import { EventData } from "./EventData";

export class CalendarData {

    #currentDate: moment.Moment;
    #dateArrayByWeek: DateData[][];

    constructor(currentDate: moment.Moment) {
        this.#currentDate = currentDate;

        let calendarDate: moment.Moment = this.#getStartWeekSunday();

        this.#dateArrayByWeek = [];
        const weekNumber: number = Math.ceil(this.#getEndWeekSaturday().diff(this.#getStartWeekSunday(), "days") / 7);
        for (let week = 0; week < weekNumber; week++) {

            const weekRow: DateData[] = [];

            for (let day = 0; day < 7; day++) {

                weekRow.push(new DateData(moment(calendarDate), this.#currentDate.format('YYYY-MM') === calendarDate.format('YYYY-MM') ? true : false));
                calendarDate.add(1, "days");
            }

            this.#dateArrayByWeek.push(weekRow);
        }

    }

    #getStartWeekSunday = (): moment.Moment => {
        const startDate = moment(this.#currentDate).startOf("month");
        const youbiNum = startDate.day();
        // console.log(youbiNum); // 今月１日の曜日を数字で表したもの

        // つまりカレンダーの第1週の日曜日の日付は
        return startDate.subtract(youbiNum, "days");
    };

    #getEndWeekSaturday = (): moment.Moment => {
        const endDate = moment(this.#currentDate).endOf("month");
        const youbiNum = endDate.day();
        // console.log(youbiNum); // 今月末日の曜日を数字で表したもの

        return endDate.add(6 - youbiNum, "days");
    }

    public get currentDate(): moment.Moment {
        return this.#currentDate;
    }


    getNextMonthCalendar = () => {
        const nextMonth = moment(this.#currentDate).add(1, "month");
        return new CalendarData(nextMonth);
    }

    getPrevMonthCalendar = () => {
        const prevMonth = moment(this.#currentDate).subtract(1, "month");
        return new CalendarData(prevMonth);
    }

    public get dateArrayByWeek(): DateData[][] {
        return this.#dateArrayByWeek;
    }

    isContained = (date: DateData) => {
        return this.#currentDate.format('YYYY-MM') === date.date.format('YYYY-MM')
    }

    setEvents = (events: EventData[]) => {
        const dateArray = this.#dateArrayByWeek.reduce((pre, current) => { pre.push(...current); return pre }, []);

        dateArray.forEach(date => {
            events.forEach(event => {
                date.setEvent(event);
            })
        })
    }
}