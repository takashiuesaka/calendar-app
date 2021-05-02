import { DateData } from "./DateData";

const Date = (props: { id: number, date: DateData }) => {

    const { id, date } = props;

    return (
        <div key={id} className={'calendar-daily' + (date.isInCurrentMonth ? '' : ' outside')}>
            <div className='calendar-day'>
                {date.dateNumber}
            </div>
            {
                date.events.map(event => {
                    return (
                        <div key={event.id}>
                            <div className='calendar-event' style={{ width: event.getWidth(date.date) + '%', backgroundColor: event.color }} draggable='true'>
                                {event.name}
                            </div>
                        </div>
                    );
                })
            }
        </div>

    );
}

export default Date;