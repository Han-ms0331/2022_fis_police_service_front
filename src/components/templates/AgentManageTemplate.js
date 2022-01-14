import React from 'react';
import {agent} from "../../store/dummy-data/agent";
import ListContainer from "../organisms/ListContainer";
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";

/*
날짜: 2022/01/13 4:14 PM
작성자: 정도식
작성내용: 현장요원관리 탭
*/
const AgentManageTemplate = () => {
    const contents=agent;
    const headerContent = ["이름","아이디","현장요원코드","전화번호","차량여부","자택주소","장비번호","장비 수령날짜"]
    const handleModifyButtonClick = (e) => {
        // button이 관리페이지의 정보 수정 버튼일 시...

        console.dir(e)
    }
    return (
        <Main>
            <ListContainer style={{width: "100%", height: "100%"}} headerContents={headerContent} contents={contents}
                           gridRatio="1fr 1fr 1fr 2fr 1fr 3fr 1fr 1fr 1fr" buttonContent="정보수정" clickFunction={handleModifyButtonClick}/>
            <CustomButton  type = "normal" width="150px" height= "35px" borderRadius="3px" color="#222" backgroundColor="#FFD400" content="현장요원 추가"/>
        </Main>
    );
};



// ================ style ================

const Main = styled.div`
& >button{
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%,0);
}
`;

export default AgentManageTemplate;