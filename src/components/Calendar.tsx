import React, { } from 'react';
import Week from './Week';
import './Calendar.css'

import { CalendarContext } from './CalendarContext';

const Calendar = () => {

    const [calendarDate, move, current] = CalendarContext.useContainer();

    const renderYoubi = () => {

        const week = ["日", "月", "火", "水", "木", "金", "土"];

        return (
            <div className='calendar-weekly'>
                {week.map((youbi, index) => <div key={index} className='calendar-youbi'>{youbi}</div>)}
            </div>
        );
    }

    return (
        <div className='content'>
            <h2>カレンダー {current.format('YYYY[年]M[月]')}</h2>
            <div className='button-area'>
                <button onClick={move.toPrevMonth}>前の月</button>
                <button onClick={move.toNextMonth}>次の月</button>
            </div>
            <div className='calendar'>
                {renderYoubi()}
                {
                    calendarDate?.map((weekData, weekIndex) => {
                        return <Week id={weekIndex} dateArray={weekData} />
                    })
                }
            </div>
        </div>
    );
}

export default Calendar;