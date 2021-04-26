import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './Calendar.css'

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(moment());
    const [currentMonth, setCurrentMonth] = useState<string>();
    const [calendars, setCalendars] = useState<{ date: number, month: string }[][]>([]);

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
                weekRow.push({
                    date: calendarDate.get("date"),
                    month: calendarDate.format('YYYY-MM')
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