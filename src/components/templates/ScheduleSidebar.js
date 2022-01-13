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

    const toggleSideBar = ()=>{ /*사이드바 토글 함수*/
        setIsSidebarOpen(!isSidebarOpen)
    }
    console.log((isSidebarOpen))
    return (
        <Container style={{transform: `${isSidebarOpen ? 'translate(0)' : 'translate(-100%)'}`}}>
            <Items className={isSidebarOpen ? "sidebar-visible":"sidebar-invisible"}>
            <CustomCalendar className="calendar" setDate={setDate}/>
            <DateContainer date={date}/>
            <MessangerContainer/>
                </Items>
            {isSidebarOpen ? <GoChevronLeft className="icon" onClick={toggleSideBar}/> :
                <GoChevronRight className="icon" onClick={toggleSideBar}/>}
        </Container>
    );
};

const Container = styled.div`
  border-right: 2px solid #eee;
  padding: 0 15px;
  position: relative;
  transition: 1s ease-out;
  
  & .sidebar-visible {
    opacity: 100;
    transition: 1s;
  }

  & .sidebar-invisible {
    opacity: 0;
    transition: 0.8s;
  }

  & .icon {    /*화살표 아이콘*/
    color: #999999;
    font-size: 1.4rem;
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
  grid-template-rows: 1fr 1fr;
  &>div {
    min-width: 0;
    align-self: center;
  }
`;
export default ScheduleSidebar;