import React, {useState} from 'react';
import styled from 'styled-components';
import Navigation from "../templates/Navigation";
import {Redirect} from "react-router-dom";
import CenterManageTemp from "../templates/CenterManageTemp";
import CustomButton from "../atoms/CustomButton";
import UserManageTemplate from "../templates/UserManageTemplate";
import AgentManageTemplate from "../templates/AgentManageTemplate";
import {Style} from "../../Style";
import {
    buttonUnstyledClasses,
    TabPanelUnstyled,
    TabsListUnstyled, TabsUnstyled,
    TabUnstyled,
    tabUnstyledClasses
} from "@mui/material";

/*
날짜: 2022/01/13 3:53 PM
작성자: 정도식
작성내용: manage page 작성
*/

function ManagePage(props) {
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
                    {/*<Container>*/}
                    <TabsUnstyled defaultValue={0}>
                            <TabsList>
                                <Tab>콜직원관리</Tab>
                                <Tab>현장요원관리</Tab>
                                <Tab>시설정보수정</Tab>
                            </TabsList>
                            <TabPanel value={0}><UserManageTemplate/></TabPanel>
                            <TabPanel value={1}><AgentManageTemplate/></TabPanel>
                            <TabPanel value={2}><CenterManageTemp/></TabPanel>

                    </TabsUnstyled>
                    {/*</Container>*/}
                </Main>
            ) :
            <Redirect to={"/"}/>


    );

}

// style

const Main = styled.div`
  display: grid;
  grid-template-columns: 67px auto;
  height: 100vh;
  border-radius: 10px;
  background-color: white;
`;

const Tab = styled(TabUnstyled)`
  color: ${Style.color2};
  cursor: pointer;
  font-weight: bold;
  background-color: ${Style.color1};
  width: 150px;
  padding: 12px 16px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-self: flex-end;

  &:hover {
    background-color: ${Style.color3};
  }


  &.${tabUnstyledClasses.selected} {
    background-color: ${Style.color2};
    color: ${Style.color1};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
=`;

const TabsList = styled(TabsListUnstyled)`
  display: flex;
  align-items: center;
  align-content: space-between;
  border-bottom: 2px solid #dadada;
  height: 100px;
  padding-left: 10px;
  margin-bottom: 30px;
`;



export default ManagePage;