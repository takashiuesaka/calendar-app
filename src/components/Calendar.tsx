import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CalendarData } from './CalendarData';
import Week from './Week';
import { ServerAccess } from './ServerAccess';
import './Calendar.css'

const Calendar = () => {

    const [calendarData, setCalendarData] = useState<CalendarData | undefined>();

    const prevMonth = () => {
        setCalendarData(data => {
            const newData = data?.getPrevMonthCalendar();
            // Server Access
            const events = ServerAccess();
            newData?.setEvents(events);
            return newData;
        });
    }

    const nextMonth = () => {
        setCalendarData(data => {
            const newData = data?.getNextMonthCalendar();
            // Server Access
            const events = ServerAccess();
            newData?.setEvents(events);
            return newData;
        });
    }

    const renderYoubi = () => {

        const week = ["日", "月", "火", "水", "木", "金", "土"];

        return (
            <div className='calendar-weekly'>
                {week.map((youbi, index) => <div key={index} className='calendar-youbi'>{youbi}</div>)}
            </div>
        );
    }

    useEffect(() => {
        if (calendarData === undefined) {
            const defaultData = new CalendarData(moment());
            // Server Access
            const events = ServerAccess();
            defaultData.setEvents(events);
            setCalendarData(defaultData);
        }
    }, [calendarData])

    return (
        <div className='content'>
            <h2>カレンダー {calendarData?.currentDate.format('YYYY[年]M[月]')}</h2>
            <div className='button-area'>
                <button onClick={prevMonth}>前の月</button>
                <button onClick={nextMonth}>次の月</button>
            </div>
            <div className='calendar'>
                {renderYoubi()}
                {
                    calendarData?.dateArrayByWeek.map((weekData, weekIndex) => {
                        return <Week id={weekIndex} dateArray={weekData} />
                    })
                }
            </div>
        </div>
    );
}

export default Calendar;