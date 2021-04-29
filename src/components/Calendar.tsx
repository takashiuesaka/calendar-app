import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './Calendar.css'

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(moment());
    const [currentMonth, setCurrentMonth] = useState<string>();
    const [calendars, setCalendars] = useState<{ date: number, month: string, dayEvents: { id: number, name: string, start: string, end: string, color: string }[] }[][]>([]);

    const getStartDate = (date: moment.Moment) => {
        const startDate = moment(date).startOf("month");
        const youbiNum = startDate.day();
        // console.log(youbiNum); // 今月１日の曜日を数字で表したもの

        // つまりカレンダーの第1週の日曜日の日付は
        return startDate.subtract(youbiNum, "days");
    };

    const getEndDate = (date: moment.Moment) => {
        const endDate = moment(date).endOf("month");
        const youbiNum = endDate.day();
        // console.log(youbiNum); // 今月末日の曜日を数字で表したもの

        return endDate.add(6 - youbiNum, "days");
    }

    const getCalendar = (date: moment.Moment) => {
        let calendarDate = getStartDate(date);
        const endDate = getEndDate(date);
        const weekNumber = Math.ceil(endDate.diff(calendarDate, "days") / 7);

        let calendars = [];
        for (let week = 0; week < weekNumber; week++) {
            let weekRow = [];
            for (let day = 0; day < 7; day++) {
                let dayEvents = getDayEvents(calendarDate);
                weekRow.push({
                    date: calendarDate.get("date"),
                    month: calendarDate.format('YYYY-MM'),
                    dayEvents
                });

                calendarDate.add(1, "days");
            }

            calendars.push(weekRow);
        }

        return calendars;
    }

    const nextMonth = () => {
        setCurrentDate((current) => {
            const nextMonth = moment(current).add(1, "month");
            return nextMonth
        });
    }

    const prevMonth = () => {
        setCurrentDate((current) => {
            const prevMonth = moment(current).subtract(1, "month");
            return prevMonth;
        });
    }

    const renderYoubi = () => {

        const week = ["日", "月", "火", "水", "木", "金", "土"];

        return (
            <div className='calendar-weekly'>
                {week.map((youbi) => <div className='calendar-youbi'>{youbi}</div>)}
            </div>
        );
    }

    const events: { id: number, name: string, start: string, end: string, color: string }[] = [
        { id: 1, name: "ミーティング", start: "2021-01-01", end: "2021-01-01", color: "blue" },
        { id: 2, name: "イベント", start: "2021-01-02", end: "2021-01-03", color: "limegreen" },
        { id: 3, name: "会議", start: "2021-01-06", end: "2021-01-06", color: "deepskyblue" },
        { id: 4, name: "有給", start: "2021-01-08", end: "2021-01-08", color: "dimgray" },
        { id: 5, name: "海外旅行", start: "2021-01-08", end: "2021-01-11", color: "navy" },
        { id: 6, name: "誕生日", start: "2021-01-16", end: "2021-01-16", color: "orange" },
        { id: 7, name: "イベント", start: "2021-01-12", end: "2021-01-15", color: "limegreen" },
        { id: 8, name: "出張", start: "2021-01-12", end: "2021-01-13", color: "teal" },
        { id: 9, name: "客先訪問", start: "2021-01-14", end: "2021-01-14", color: "red" },
        { id: 10, name: "パーティ", start: "2021-01-15", end: "2021-01-15", color: "royalblue" },
        { id: 12, name: "ミーティング", start: "2021-01-18", end: "2021-01-19", color: "blue" },
        { id: 13, name: "イベント", start: "2021-01-21", end: "2021-01-21", color: "limegreen" },
        { id: 14, name: "有給", start: "2021-01-20", end: "2021-01-20", color: "dimgray" },
        { id: 15, name: "イベント", start: "2021-01-25", end: "2021-01-28", color: "limegreen" },
        { id: 16, name: "会議", start: "2021-01-21", end: "2021-01-21", color: "deepskyblue" },
        { id: 17, name: "旅行", start: "2021-01-23", end: "2021-01-24", color: "navy" },
        { id: 18, name: "ミーティング", start: "2021-01-28", end: "2021-01-28", color: "blue" },
        { id: 19, name: "会議", start: "2021-01-12", end: "2021-01-12", color: "deepskyblue" },
        { id: 20, name: "誕生日", start: "2021-01-30", end: "2021-01-30", color: "orange" },
    ];

    const getDayEvents = (date: moment.Moment) => {
        return events.filter(event => {
            let startDate = moment(event.start).format('YYYY-MM-DD')
            let endDate = moment(event.end).format('YYYY-MM-DD')
            let Date = date.format('YYYY-MM-DD')
            if (startDate <= Date && endDate >= Date)
                return true;

            return false;
        });
    };

    useEffect(() => {
        setCalendars(getCalendar(currentDate));
        setCurrentMonth(currentDate.format('YYYY-MM'));
    }, [currentDate]);

    return (
        <div className='content'>
            <h2>カレンダー {currentDate.format('YYYY[年]M[月]')}</h2>
            <div className='button-area'>
                <button onClick={prevMonth}>前の月</button>
                <button onClick={nextMonth}>次の月</button>
            </div>
            <div className='calendar'>
                {renderYoubi()}
                {
                    calendars.map((week, rowIndex) => {
                        return (
                            <div key={rowIndex} className='calendar-weekly'>
                                {
                                    week.map((day, colIndex) => {
                                        return (
                                            <div key={colIndex} className={'calendar-daily' + (day.month !== currentMonth ? ' outside' : '')}>
                                                <div className='calendar-day'>
                                                    {day.date}
                                                </div>
                                                {
                                                    day.dayEvents.map(event => {
                                                        return (
                                                            <div key={event.id}>
                                                                <div className='calendar-event' style={{ backgroundColor: event.color }} draggable='true'>
                                                                    {event.name}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        );
                                    })}
                            </div>);
                    })
                }
            </div>
        </div>);
};

export default Calendar;