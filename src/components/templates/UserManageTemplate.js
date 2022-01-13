import React from 'react';
import styled from 'styled-components';
import {user} from '../../store/dummy-data/user'
import ListContainer from "../organisms/ListContainer";
import CustomButton from "../atoms/CustomButton";
import UserManageInputForm from "../organisms/UserManageInputForm";
/*
날짜: 2022/01/13 4:14 PM
작성자: 정도식
작성내용: 콜직원관리 탭
*/

const UserManageTemplate = () => {
    const contents=user;
    const headerContent = ["이름","아이디","비밀번호","입사일","전화번호","평균통화건수","오늘통화건수"]
    const handleModifyButtonClick = (e) => {
        // button이 관리페이지의 정보 수정 버튼일 시...

        console.dir(e)
    }
    return (
        <Main>
            <ListContainer style={{width: "100%", height: "100%"}} headerContents={headerContent} contents={contents}
                           gridRatio="1fr 1fr 1fr 1fr 2fr 1fr 1fr 1fr" buttonContent="정보수정" clickFunction={handleModifyButtonClick}/>
            <CustomButton  type = "normal" width="150px" height= "35px" borderRadius="3px" color="#222" backgroundColor="#FFD400" content="콜직원 추가"/>
        {/*<UserManageInputForm/>*/}
        </Main>
    );
};
const Main = styled.div`
& >button{
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%,0);
}
`;
export default UserManageTemplate;