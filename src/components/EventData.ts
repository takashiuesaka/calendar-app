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

    getWidth(date: moment.Moment): string {
        return '95';
    }

    isSameWithStartDate(date: moment.Moment): boolean {
        return this.#startDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    }

    isBetweenStartAndEnd(date: moment.Moment): boolean {
        return this.#startDate.format('YYYY-MM-DD') <= date.format('YYYY-MM-DD') && date.format('YYYY-MM-DD') <= this.#endDate.format('YYYY-MM-DD');
    }
}