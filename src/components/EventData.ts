import moment from "moment";

export class EventData {
    #id: number;
    #name: string;
    #startDate: moment.Moment;
    #endDate: moment.Moment;
    #color: string;

    constructor(param: { id: number, name: string, startDate: string, endDate: string, color: string }) {
        this.#id = param.id;
        this.#name = param.name;
        this.#startDate = moment(param.startDate);
        this.#endDate = moment(param.endDate);
        this.#color = param.color;
    }


    public get id(): number {
        return this.#id;
    }

    public get name(): string {
        return this.#name;
    }


    public get color(): string {
        return this.#color;
    }

    public get startDate(): moment.Moment {
        return this.#startDate;
    }

    getWidth(date: moment.Moment): number {
        const eventDays: number = this.#endDate.diff(this.#startDate, "days") + 1;
        const maxRenderDateCount: number = 7 - date.get('day');

        // 金曜日(5)の場合、maxmRenderCountは2日間。イベント期間が3日間でも２日間にしなければダメ
        //        console.log(`date: ${date.format('YYYY-MM-DD')}, eventDays: ${eventDays}, maxRenderDateCount: ${maxRenderDateCount}`);

        if (this.#isSameWithStartDate(date)) {

            if (eventDays > maxRenderDateCount) {
                return (maxRenderDateCount - 1) * 100 + 95;
            } else {
                return (eventDays - 1) * 100 + 95;
            }
        }

        if (date.get('day') === 0) {
            const remainingDays = this.#endDate.diff(date, 'days') + 1;
            console.log(`date: ${date.format('YYYY-MM-DD')}, remainingDays: ${remainingDays}`);

            return (remainingDays - 1) * 100 + 95;
        }

        return 0;
    }

    isDummyEvent(date: moment.Moment): boolean {
        if (!this.#isSameWithStartDate(date) && date.get('day') !== 0)
            return true;

        return false;
    }

    #isSameWithStartDate = (date: moment.Moment): boolean => {
        return this.#startDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    }

    isBetweenStartAndEnd(date: moment.Moment): boolean {
        return this.#startDate.format('YYYY-MM-DD') <= date.format('YYYY-MM-DD') && date.format('YYYY-MM-DD') <= this.#endDate.format('YYYY-MM-DD');
    }
}