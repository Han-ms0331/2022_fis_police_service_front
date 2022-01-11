import React,{useState} from 'react';
import CustomCalendar from "../atoms/CustomCalendar";
import DateContainer from "../organisms/DateContainer";
import MessangerContainer from "../organisms/MessangerContainer";
import { GoChevronLeft,GoChevronRight } from "react-icons/go"; // 접을 때 필요한 아이콘
import Grid from "@material-ui/core/Grid";

/*
날짜: 2022/01/10 3:49 PM
작성자: 정도식
작성내용: 사이드바에 해당하는 부분
*/
const ScheduleSidebar = () => {
    const [date,setDate] = useState(new Date());
    return (
        <div>
            <Grid container>

                <Grid item xs={12}>
                <CustomCalendar setDate={setDate}/>
                </Grid>

                <Grid item xs ={12}>
            <DateContainer date={date}/>
                </Grid>

                <Grid item xs = {12}>
            <MessangerContainer/>
                </Grid>

            </Grid>
            <GoChevronLeft/>
        </div>
    );
};

export default ScheduleSidebar;