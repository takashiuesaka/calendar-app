import React from "react";
import { } from 'unstated-next';
import { CalendarContext, DateType, EventType } from './CalendarContext';

const Date = (props: { id: number, date: DateType }) => {

    const { id, date } = props;

    // const { calendarDate, move, current, moveEvent } = CalendarContext.useContainer();
    const [, , , moveEvent] = CalendarContext.useContainer();

    const dragStart = (e: React.DragEvent<HTMLDivElement>, eventId: number) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("eventId", String(eventId));
    }

    const dragEnd = (e: React.DragEvent<HTMLDivElement>, droppedDate: DateType) => {
        const eventId: string = e.dataTransfer.getData("eventId");
        console.log(eventId);
        console.log(droppedDate.date.format('YYYY-MM-DD'))
        // どうしよう？？
        moveEvent(eventId, droppedDate);
    }

    const getWidth = (event: EventType): number => {
        const eventDays: number = event.endDate.diff(event.startDate, "days") + 1;
        const maxRenderDateCount: number = 7 - date.date.day();

        // 金曜日(5)の場合、maxmRenderCountは2日間。イベント期間が3日間でも２日間にしなければダメ
        //        console.log(`date: ${date.format('YYYY-MM-DD')}, eventDays: ${eventDays}, maxRenderDateCount: ${maxRenderDateCount}`);

        if (event.startDate.isSame(date.date)) {

            if (eventDays > maxRenderDateCount) {
                return (maxRenderDateCount - 1) * 100 + 95;
            } else {
                return (eventDays - 1) * 100 + 95;
            }
        }

        if (date.date.day() === 0) {
            const remainingDays = event.endDate.diff(date.date, 'days') + 1;
            console.log(`date: ${date.date.format('YYYY-MM-DD')}, remainingDays: ${remainingDays}`);

            return (remainingDays - 1) * 100 + 95;
        }

        return 0;
    }

    const renderEvent = () => {
        return (
            date.events?.map(event => {
                return (
                    <div key={event.id}>
                        {
                            (() => {
                                if (!event.startDate.isSame(date.date) && date.date.day() !== 0) {
                                    return (<div style={{ height: '26px' }}></div>)
                                }
                                else {
                                    return (
                                        <div className='calendar-event' style={{ width: getWidth(event) + '%', backgroundColor: event.color }} draggable='true' onDragStart={(e) => dragStart(e, event.id)}>
                                            {event.name}
                                        </div>
                                    );
                                }
                            })()
                        }
                    </div>
                );
            })
        );
    }

    return (
        <div key={id} className={'calendar-daily' + (date.isInCurrentMonth ? '' : ' outside')} onDrop={e => dragEnd(e, date)} onDragOver={e => e.preventDefault()}>
            <div className='calendar-day'>
                {date.date.get('date')}
            </div>
            {
                renderEvent()
            }
        </div>

    );
}

export default Date;