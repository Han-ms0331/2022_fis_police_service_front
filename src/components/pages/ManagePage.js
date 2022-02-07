import React from 'react';
import styled from 'styled-components';
import Navigation from "../templates/Navigation";
import CenterManageTemp from "../templates/CenterManageTemp";
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

    return (
        <Main>
            <Navigation/>
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
        </Main>
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
  background-color: ${Style.color1};
  width: 150px;
  padding: 12px 16px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  font-family: ${Style.font};
  font-weight: bolder;


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