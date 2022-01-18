import React, {useState} from 'react';
import styled from "styled-components";
import CustomCalendar from "../atoms/CustomCalendar";
import DateContainer from "../organisms/DateContainer";
import MessangerContainer from "../organisms/MessangerContainer";
import {GoChevronLeft, GoChevronRight} from "react-icons/go"; // 접을 때 필요한 아이콘
import Grid from "@material-ui/core/Grid";

/*
날짜: 2022/01/11 3:59 PM
작성자: 정도식
작성내용: collapsible sidebar 구현
*/
/*
날짜: 2022/01/12 3:01 PM
작성자: 정도식
작성내용: sidebar css grid로 변경
*/
const ScheduleSidebar = () => {
    const [date, setDate] = useState(new Date());
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const visit_date = `${date.getFullYear()}-${date.getMonth()+1<10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate()<10 ? `0${date.getDate()}` : date.getDate()}`


    const toggleSideBar = ()=>{
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <Container>
            <Items>
            <CustomCalendar className="calendar" setDate={setDate}/>
            <DateContainer date={date}/>
            <MessangerContainer/>
            </Items>
        </Container>
    );
};

const Container = styled.div`
  //border-right: 2px solid #eee;
  padding: 0 15px;
  position: relative;
  transition: 1s ease-out;

  & .icon {    /*화살표 아이콘*/
    color: #999999;
    font-size: 29px;
    position: absolute;
    top: 50%;
    right: -16px;
    z-index: 5;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 16px;
    cursor: pointer;
  }
`;

const Items = styled.div`
display: grid;
  grid-template-rows: 2fr 1fr 1fr;
  &>div {
    min-width: 0;
    align-self: center;
  }
`;
export default ScheduleSidebar;