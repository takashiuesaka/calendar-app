import Date from './Date';

import { DateType } from './CalendarContext';

const Week = (props: { id: number, dateArray: DateType[] }) => {

    const { id, dateArray } = props;

    return (
        <div key={id} className='calendar-weekly'>
            {
                dateArray.map((date, dayIndex) => {
                    return (
                        <Date id={dayIndex} date={date} />
                    );
                })
            }
        </div>
    );
};

export default Week;