import React from 'react';
import styled from 'styled-components';
import Navigation from "../templates/Navigation";
import ScheduleBody from "../templates/ScheduleBody";
import ScheduleSidebar from "../templates/ScheduleSidebar";
import Grid from '@material-ui/core/Grid';
import {Redirect} from "react-router-dom";
/*
날짜: 2022/01/12 11:51 AM
작성자: 정도식
작성내용: grid로 레에아웃 변경
*/
const SchedulePage = (props)=>{
    return (
        props.isLogined?    //props로 받은 islogined state에 따라 보여주는 창이 달라짐
        <Main>
                <Navigation />
                <ScheduleSidebar />
                <ScheduleBody/>
        </Main>
            :
            <Redirect to={"/"} />
    );
}
const Main = styled.div`
    display: grid;
  grid-template-columns: 3% 14% 83%;
  height: 100vh;
`;
export default SchedulePage;