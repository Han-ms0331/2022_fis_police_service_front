import React from 'react';
import ScheduleMonthTemplate from "../templates/ScheduleMonthTemplate";
import Navigation from "../templates/Navigation";
import MainBodyTemplate from "../templates/MainBodyTemplate";
import MainInfoTemplate from "../templates/MainInfoTemplate";
import styled from "styled-components";

function ScheduleCalendarPage(props) {
    return (
        <Main>
            <Navigation />
            <ScheduleMonthTemplate />
        </Main>
    );
}
const Main = styled.div`
  display: grid;
  grid-template-columns: ${(props)=>props.isSidebarOpen===true?'67px 350px auto':'67px 0px auto'};
  min-height: 100vh;
  transition: 1s;
  & .sidebar{ //Sidebar
    border-right: ${(props)=> props.isSidebarOpen===true?'2px solid #eee':'none'};
    position: relative;

    & > div { //사이드바 내용
      display: ${(props) => props.isSidebarOpen === true ? 'block' : 'none'};
    }
    
    & .icon{ // >< 화살표 아이콘
      color: #999999;
      font-size: 29px;
      position: absolute;
      top: 550px;
      right: -16px;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 16px;
      cursor: pointer;
    }
  }
`;

export default ScheduleCalendarPage;