import React,{useState} from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({setDate}) => {
    const [value, setValue] = useState(new Date());

    return (
        <div>
            <Calendar
                onChange={(day)=>()=>{
                    setValue(day);
                    setDate(value);
                    console.log(value);
                }}
                value={value}
                calendarType="ISO 8601"
                locale="en"
            />

        </div>
    );
};

export default CustomCalendar;