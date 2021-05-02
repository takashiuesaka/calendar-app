import React from "react";
import { DateData } from "./DateData";

const Date = (props: { id: number, date: DateData }) => {

    const { id, date } = props;

    const dragStart = (e: React.DragEvent<HTMLDivElement>, eventId: number) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("eventId", String(eventId));
    }

    const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        console.log(e.dataTransfer.getData("eventId"));
    }

    return (
        <div key={id} className={'calendar-daily' + (date.isInCurrentMonth ? '' : ' outside')} onDrop={e => dragEnd(e)} onDragOver={e => e.preventDefault()}>
            <div className='calendar-day'>
                {date.dateNumber}
            </div>
            {
                date.events.map(event => {
                    return (
                        <div key={event.id}>
                            {
                                (() => {
                                    if (event.isDummyEvent(date.date)) {
                                        return (<div style={{ height: '26px' }}></div>)
                                    }
                                    else {
                                        return (
                                            <div className='calendar-event' style={{ width: event.getWidth(date.date) + '%', backgroundColor: event.color }} draggable='true' onDragStart={(e) => dragStart(e, event.id)}>
                                                {event.name}
                                            </div>
                                        );
                                    }
                                })()
                            }
                        </div>
                    );
                })
            }
        </div>

    );
}

export default Date;