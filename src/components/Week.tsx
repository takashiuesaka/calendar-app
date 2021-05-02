import { DateData } from "./DateData";
import Date from './Date';

const Week = (props: { id: number, dateArray: DateData[] }) => {

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