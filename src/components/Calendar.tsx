import moment from 'moment';
import React, { useEffect, useState } from 'react';

const Calendar = () => {

    const [currentDate,] = useState(moment());
    const [calendars, setCalendars] = useState<{ date: number; }[][]>([]);

    const getStartDate = () => {
        const date = moment(currentDate).startOf("month");
        const youbiNum = date.day();
        // console.log(youbiNum); // 今月１日の曜日を数字で表したもの

        // つまりカレンダーの第1週の日曜日の日付は
        return date.subtract(youbiNum, "days");
    };

    const getEndDate = () => {
        const date = moment(currentDate).endOf("month");
        const youbiNum = date.day();
        // console.log(youbiNum); // 今月末日の曜日を数字で表したもの

        return date.add(6 - youbiNum, "days");
    }

    const getCalendar = () => {
        let startDate = getStartDate();
        const endDate = getEndDate();
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

    useEffect(() => {
        //        console.log(getCalendar());
        setCalendars(getCalendar());
    }, []);

    return (
        <>
            <h2>カレンダー{currentDate.format("LLL")}</h2>
            {
                calendars.map((week) => {
                    return (
                        <div style={{ display: 'flex' }}>
                            {week.map((day) => {
                                return (<div>{day.date}</div>);
                            })}
                        </div>);
                })
            }
        </>);
};

export default Calendar;