import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navigation from "../templates/Navigation";
import {Redirect} from "react-router-dom";
import MainInfoTemplate from "../templates/MainInfoTemplate";
import MainBodyTemplate from "../templates/MainBodyTemplate";

/*
    날짜: 2022/01/13 10:36 오전
    작성자: 한명수
    작성내용:   MainInfoTemplate 적용
*/
function MainPage(props) {
    let isLogined;      //로그인 상태에 따라 랜더링을 결정하는 변수
    if (localStorage.getItem("loginStatus") === "true") //localstorage에서 loginStatus가 true일때 isLogined를 true로 바꿔줌
        isLogined = true;
    else
        isLogined = false;
    return (
        isLogined ?     //isLogined가 false면 redirect를 시킴
            (
                <Main>
                    <Navigation/>
                    <div style={{height: "100vh", borderRight: "1px solid #6D5A00"}}>
                        <MainBodyTemplate/>
                    </div>

                    <div>
                       <MainInfoTemplate />
                    </div>
                </Main>
            )
            :
            <Redirect to={"/"}/>
    );
}

const Main = styled.div`
  display: grid;
  grid-template-columns: 67px 1600px auto;
  height: 100vh;
`;
export default MainPage;