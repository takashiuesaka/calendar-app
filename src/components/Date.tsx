import { DragEventHandler } from "react";
import { DateData } from "./DateData";

const Date = (props: { id: number, date: DateData }) => {

    const { id, date } = props;

    const dragStart = (eventId: number) => {
        console.log(eventId);
        return;
    }

    return (
        <div key={id} className={'calendar-daily' + (date.isInCurrentMonth ? '' : ' outside')}>
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
                                            <div className='calendar-event' style={{ width: event.getWidth(date.date) + '%', backgroundColor: event.color }} draggable='true' onDragStart={(e) => dragStart(event.id)}>
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