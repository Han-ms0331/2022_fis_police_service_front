import React from 'react';
import styled from 'styled-components';
import Navigation from "../templates/Navigation";
import {Redirect} from "react-router-dom";

function ManagePage(props) {
    let isLogined;      //로그인 상태에 따라 랜더링을 결정하는 변수
    if (localStorage.getItem("loginStatus") === "true") //localstorage에서 loginStatus가 true일때 isLogined를 true로 바꿔줌
        isLogined= true;
    else
        isLogined = false;
    return (
        isLogined ?     //isLogined가 false면 redirect를 시킴
            (
        <Main>
                    <Navigation/>
                    manage
        </Main>
    )   :
            <Redirect to={"/"} />
    )
}
const Main = styled.div`
    display: grid;
  grid-template-columns: 3% 97%;
  height: 100vh;
`;
export default ManagePage;