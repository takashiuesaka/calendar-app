import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect, useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { ServerAccess } from './ServerAccess';

export type EventType = {
    id: number;
    name: string;
    startDate: Dayjs;
    endDate: Dayjs;
    color: string;

}
export type DateType = {
    date: Dayjs;
    isInCurrentMonth: boolean;
    events: EventType[] | undefined;
}

const useCalendar = () => {

    const [calendarData, setCalendarData] = useState<DateType[][]>();
    const [current, setCurrent] = useState(dayjs());
    const [events, setEvents] = useState<EventType[]>();

    const getStartWeekSunday = (date: Dayjs) => {
        const startDate = date.startOf("month");
        const youbiNum = startDate.day();
        // console.log(youbiNum); // 今月１日の曜日を数字で表したもの

        // つまりカレンダーの第1週の日曜日の日付は
        return startDate.subtract(youbiNum, "days");
    }

    const getEndWeekSaturday = (date: Dayjs) => {
        const endDate = date.endOf("month");
        const youbiNum = endDate.day();
        // console.log(youbiNum); // 今月末日の曜日を数字で表したもの

        return endDate.add(6 - youbiNum, "days");
    }

    const toNextMonth = () => {
        const nextMonth = current.add(1, "month");
        setCurrent(nextMonth);
    }

    const toPrevMonth = useCallback(() => {
        const prevMonth = current.subtract(1, "month");
        setCurrent(prevMonth);
    }, [current])

    const moveEvent = (targetEventId: string, toDate: DateType) => {
        console.log(targetEventId);
        console.log(toDate.date.format('YYYY-MM-DD'))
        setEvents((events) => {
            return (
                events?.map(event => {
                    if (event.id === Number(targetEventId)) {
                        const eventDays = event.endDate.diff(event.startDate, "days");
                        event.startDate = toDate.date;
                        event.endDate = toDate.date.add(eventDays, "day");
                    }
                    return event;
                })
            );
        })
    }

    useEffect(() => {
        // Server Access
        const events = ServerAccess();
        setEvents(events);
    }, [])

    useEffect(() => {
        const startWeekSunday: Dayjs = getStartWeekSunday(current);
        const endWeekSaturday: Dayjs = getEndWeekSaturday(current);

        const dateArrayByWeek = [];
        const weekNumber: number = Math.ceil(endWeekSaturday.diff(startWeekSunday, "days") / 7);
        let calendarDate = dayjs(startWeekSunday);

        for (let week = 0; week < weekNumber; week++) {

            const weekRow: DateType[] = [];

            for (let day = 0; day < 7; day++) {

                const stringCalendarDate = calendarDate.format('YYYY-MM-DD')
                const calendarEvents = events?.filter(event => event.startDate.format('YYYY-MM-DD') <= stringCalendarDate && stringCalendarDate <= event.endDate.format("YYYY-MM-DD"));
                weekRow.push({ date: calendarDate, isInCurrentMonth: current?.format('YYYY-MM') === calendarDate.format('YYYY-MM') ? true : false, events: calendarEvents });
                calendarDate = calendarDate.add(1, "days");
            }

            dateArrayByWeek.push(weekRow);
        }

        setCalendarData(dateArrayByWeek);
    }, [current, events])

    return [calendarData, { toPrevMonth, toNextMonth }, current, moveEvent] as const;
}

export const CalendarContext = createContainer(useCalendar);