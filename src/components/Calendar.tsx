import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CalendarData, Date } from './CalendarData'
import './Calendar.css'

const Calendar = () => {

    const [calendarData, setCalendarData] = useState(new CalendarData(moment()))

    const prevMonth = () => setCalendarData(data => data.getPrevMonthCalendar());
    const nextMonth = () => setCalendarData(data => data.getNextMonthCalendar());

    const renderYoubi = () => {

        const week = ["日", "月", "火", "水", "木", "金", "土"];

        return (
            <div className='calendar-weekly'>
                {week.map((youbi) => <div className='calendar-youbi'>{youbi}</div>)}
            </div>
        );
    }

    return (
        <div className='content'>
            <h2>カレンダー {calendarData.currentDate.format('YYYY[年]M[月]')}</h2>
            <div className='button-area'>
                <button onClick={prevMonth}>前の月</button>
                <button onClick={nextMonth}>次の月</button>
            </div>
            <div className='calendar'>
                {renderYoubi()}
                {
                    calendarData.getWeeks().map((week, weekIndex) => {
                        return (
                            <div key={weekIndex} className='calendar-weekly'>
                                {
                                    week.map((date, colIndex) => {
                                        return (
                                            <div key={colIndex} className={'calendar-daily' + (!calendarData.isContained(date) ? ' outside' : '')}>
                                                <div className='calendar-day'>
                                                    {date.dateNumber}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>);
                    })
                }
            </div>
        </div>
    );
}

export default Calendar;