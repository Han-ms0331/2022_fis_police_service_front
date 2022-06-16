import React, {useEffect, useState} from 'react';
import {IconButton} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function ScheduleMonthTemplate(props) {
    const [date,setDate] = useState("");
    const today = new Date();
    const [defaultMonth, setDefaultMonth] = useState("");

    useEffect(()=>{
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        setDefaultMonth(month);
    },[])


    return (
        <div>
            <IconButton aria-label={ChevronLeftIcon}/>
            {defaultMonth}
        </div>
    );
}

export default ScheduleMonthTemplate;