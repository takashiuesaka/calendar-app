import moment from 'moment';
import React, { useEffect, useState } from 'react';

const Calendar = () => {

    const [currentDate,] = useState(moment());

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

    useEffect(() => {
        const startDate = getStartDate();
        const endDate = getEndDate();
        const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

        console.log(weekNumber);
    }, []);

    return <><p>Hello World</p></>
};

export default Calendar;