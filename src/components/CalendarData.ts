import moment from "moment";

export class CalendarData {

    #currentDate: moment.Moment;

    constructor(currentDate: moment.Moment) {
        this.#currentDate = currentDate;
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

    #getWeekNumber = (): number => {
        return Math.ceil(this.#getEndWeekSaturday().diff(this.#getStartWeekSunday(), "days") / 7);
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

    getWeeks = () => {
        let calendarDate: moment.Moment = this.#getStartWeekSunday();

        let calendars: Date[][] = [];
        for (let week = 0; week < this.#getWeekNumber(); week++) {

            const weekRow: Date[] = [];

            for (let day = 0; day < 7; day++) {

                weekRow.push(new Date(moment(calendarDate)));
                calendarDate.add(1, "days");
            }

            calendars.push(weekRow);
        }

        return calendars;
    }

    isContained = (date: Date) => {
        return this.#currentDate.format('YYYY-MM') === date.date.format('YYYY-MM')
    }

}

export class Date {

    #date: moment.Moment;

    constructor(date: moment.Moment) {
        this.#date = date;
    }

    public get dateNumber(): number {
        return this.#date.get('date');
    }

    public get date(): moment.Moment {
        return this.#date;
    }
}
