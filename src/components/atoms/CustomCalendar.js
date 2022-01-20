import React, {useEffect, useState} from 'react';
import Calendar from "react-calendar";
import './Calendar.css';
import {useRecoilState} from "recoil";
import {dateSelectedRows} from "../../store/DateSelectedRowsStore";
import axios from "axios";

/*
날짜: 2022/01/11 3:31 PM
작성자: 정도식
작성내용: 캘린더 UI 수정
*/
const CustomCalendar = ({setDate}) => {
    const [value, setValue] = useState(new Date());
    const visit_date = `${value.getFullYear()}-${value.getMonth()+1<10 ? `0${value.getMonth()+1}` : value.getMonth()+1}-${value.getDate()<10 ? `0${value.getDate()}` : value.getDate()}`;
    const [rows, setRows] = useRecoilState(dateSelectedRows); // 날짜를 선택하기 전인 경우이므로 맨 처음 여기서 default로 dateSelectedRows에 오늘 날짜의 Rows를 설정해줘야한다. -> onChange에 넣지말고 useEffect?

    const onData = async () => {   //서버로부터 데이터를 받아와 setRows 스테이트에 데이터들을 저장하는 함수
        await axios.get(`/schedule?date=${visit_date}`)
            .then((res) => {
                // console.log(res.data);
                setRows(res.data);
            })
    }

    useEffect(() => {
        onData(); // 날짜를 선택한 경우에 함수 실행
    }, [value])
    return (
        <div>
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

        </div>
    );
};

export default CustomCalendar;