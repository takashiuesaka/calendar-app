import moment from 'moment';
import React, { useEffect, useState } from 'react';

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(moment());
    const [calendars, setCalendars] = useState<{ date: number; }[][]>([]);

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
        let startDate = getStartDate(date);
        const endDate = getEndDate(date);
        const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

        let calendars = [];
        for (let week = 0; week < weekNumber; week++) {
            let weekRow = [];
            for (let day = 0; day < 7; day++) {
                weekRow.push({
                    date: startDate.get("date")
                });

                startDate.add(1, "days");
            }

            calendars.push(weekRow);
        }

        return calendars;
    }

    const nextMonth = () => {
        setCurrentDate((current) => {
            const nextMonth = moment(current).add(1, "month");
            setCalendars(getCalendar(nextMonth))
            return nextMonth
        });
    }

    const prevMonth = () => {
        setCurrentDate((current) => {
            const prevMonth = moment(current).subtract(1, "month");
            setCalendars(getCalendar(prevMonth));
            return prevMonth;
        });
    }

    useEffect(() => {
        setCalendars(getCalendar(currentDate));
    }, []);

    return (
        <>
            <h2>カレンダー{currentDate.format("LLL")}</h2>
            <button onClick={prevMonth}>前の月</button>
            <button onClick={nextMonth}>次の月</button>
            <div style={{ maxWidth: '900px', borderTop: '1px solid grey' }}>
                {
                    calendars.map((week, rowIndex) => {
                        return (
                            <div key={rowIndex} style={{ display: 'flex', borderLeft: '1px solid gray' }}>
                                {week.map((day, colIndex) => {
                                    return (
                                        <div key={colIndex} style={{ flex: 1, minHeight: '125px', borderRight: '1px solid gray', borderBottom: '1px solid gray' }}>
                                            {day.date}
                                        </div>);
                                })}
                            </div>);
                    })
                }
            </div>
        </>);
};

export default Calendar;