import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navigation from "../templates/Navigation";
import {Redirect} from "react-router-dom";
import MainInfoTemplate from "../templates/MainInfoTemplate";
import MainBodyTemplate from "../templates/MainBodyTemplate";
import {useRecoilValue} from "recoil";
import {isLoginedState} from "../../store/LoginStore";

/*
    날짜: 2022/01/13 10:36 오전
    작성자: 한명수
    작성내용:   MainInfoTemplate 적용
*/
function MainPage(props) {
    const [isSelected, setIsSelected] = useState(false);

    return (
                <Main>
                    <Navigation/>
                    <div style={{height: "100vh", borderRight: "1px solid #6D5A00"}}>
                        <MainBodyTemplate isSelected={isSelected} setIsSelected={setIsSelected}/>
                    </div>

                    <div>
                       <MainInfoTemplate isSelected={isSelected} />
                    </div>
                </Main>
    );
}

const Main = styled.div`
  display: grid;
  grid-template-columns: 67px 1600px auto;
  height: 100vh;
`;
export default MainPage;