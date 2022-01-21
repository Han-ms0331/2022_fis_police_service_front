import React, {useEffect, useState} from 'react';
import Calendar from "react-calendar";
import './Calendar.css';
import {useRecoilState} from "recoil";
import {dateSelectedRows} from "../../store/DateSelectedRowsStore";
import axios from "axios";
import {searchKeyword} from "../../store/ScheduleSearchKeyword";

/*
날짜: 2022/01/11 3:31 PM
작성자: 정도식
작성내용: 캘린더 UI 수정
*/
const CustomCalendar = ({setDate}) => {
    const [value, setValue] = useState(new Date());




    return (
            <Calendar
                onChange={(day)=>{
                    setValue(day);
                    setDate(day);

                    // onData(); 여기에 넣으면 setState가 늦게 되어버림..
                }}
                value={value}
                calendarType="ISO 8601"
                locale="en"
                formatMonth = {(locale, date) => ['1월', '2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월',][date.getMonth()]}
                formatShortWeekday = {(locale, date) => ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                formatMonthYear = {(locale, date) => ['1월', '2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월',][date.getMonth()]}
                />
    );
};

export default CustomCalendar;