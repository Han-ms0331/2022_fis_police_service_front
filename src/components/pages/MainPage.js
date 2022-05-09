import React, {useState} from 'react';
import styled from "styled-components";
import Navigation from "../templates/Navigation";
import MainInfoTemplate from "../templates/MainInfoTemplate";
import MainBodyTemplate from "../templates/MainBodyTemplate";

/*
    날짜: 2022/01/13 10:36 오전
    작성자: 한명수
    작성내용:   MainInfoTemplate 적용
*/

function MainPage(props) {
    const [isSelected, setIsSelected] = useState(false);
    const [agentListLoading, setAgentListLoading] = useState(null)
    return (
                <Main>
                    <Navigation/>
                    <MainBodyTemplate isSelected={isSelected} setIsSelected={setIsSelected} setAgentListLoading={setAgentListLoading} agentListLoading={agentListLoading}/>
                    <MainInfoTemplate isSelected={isSelected} setAgentListLoading={setAgentListLoading}/>
                </Main>
    );
}

const Main = styled.div`
  display: grid;
  grid-template-columns: 67px 1200px auto;
  height: 100vh;
`;
export default MainPage;