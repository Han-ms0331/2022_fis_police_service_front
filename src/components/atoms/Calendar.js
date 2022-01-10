import React,{useState} from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
    const [value, setValue] = useState(new Date());
    console.log((value));
    return (
        <div>
            <Calendar
                onChange={(day)=>setValue(day)}
                value={value}
                calendarType="ISO 8601"
                locale="en"
            />

        </div>
    );
};

export default CustomCalendar;