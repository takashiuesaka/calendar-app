import { EventData } from './EventData'

export class DateData {

    #date: moment.Moment;
    #isInCurrentMonth: boolean;
    #events: EventData[];

    constructor(date: moment.Moment, isInCurrentMonth: boolean) {
        this.#date = date;
        this.#isInCurrentMonth = isInCurrentMonth;
        this.#events = [];
    }

    public get dateNumber(): number {
        return this.#date.get('date');
    }

    public get date(): moment.Moment {
        return this.#date;
    }

    public get isInCurrentMonth(): boolean {
        return this.#isInCurrentMonth;
    }

    public get events(): EventData[] {
        return this.#events;
    }

    setEvent(event: EventData): void {
        // セットされたEventのStart、End期間内に自分のもつ日付がなかったら無視
        if (event.isBetweenStartAndEnd(this.#date)) {
            this.#events.push(event);
        }
    }

}