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
    let isLogined;      //로그인 상태에 따라 랜더링을 결정하는 변수
    if (localStorage.getItem("loginStatus") === "true") //localstorage에서 loginStatus가 true일때 isLogined를 true로 바꿔줌
        isLogined= true;
    else
        isLogined = false;
    return (
        isLogined ?     //isLogined가 false면 redirect를 시킴

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