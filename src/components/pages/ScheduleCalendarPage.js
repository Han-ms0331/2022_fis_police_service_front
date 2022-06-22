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
  grid-template-columns: 67px 1200px auto;
  height: 100vh;
`;


export default ScheduleCalendarPage;