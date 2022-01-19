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

    // const [whichTab, setWhichTab] = useState("userManage");
    // const renderTab = (tab) => {
    //     switch (tab) {
    //         case 'userManage':
    //             return <UserManageTemplate/>
    //         case 'agentManage':
    //             return <AgentManageTemplate/>
    //         case 'centerManage':
    //             return <CenterManageTemp/>
    //     }
    // }
    // const handdleClick = (tab, event) => { /*상단 네비게이션 메뉴를 클릭했을 때 state변경*/
    //
    //     setWhichTab(tab);
    // }
    return (
        isLogined ?     //isLogined가 false면 redirect를 시킴
            (
                //     <Main>
                //         <Navigation/>
                //         <Container>
                //             <NavigationTab>
                //                 <div className="btnContainer">
                //                     <CustomButton class="userManage" type="normal" width="150px" height="35px"
                //                                   borderRadius="3px" color={Style.color1} backgroundColor={Style.color2}
                //                                   content="콜직원관리" onClick={(event) => handdleClick("userManage", event)}/>
                //                     <CustomButton class="agentManage" type="normal" width="150px" height="35px"
                //                                   borderRadius="3px" color={Style.color2} backgroundColor={Style.color1}
                //                                   content="현장요원관리" onClick={(event) => handdleClick("agentManage", event)}/>
                //                     <CustomButton class="centerManage" type="normal" width="150px" height="35px"
                //                                   borderRadius="3px" color={Style.color2} backgroundColor={Style.color1}
                //                                   content="시설정보수정"
                //                                   onClick={(event) => handdleClick("centerManage", event)}/>
                //                 </div>
                //             </NavigationTab>
                //             <Content>
                //                 {renderTab(whichTab)}
                //             </Content>
                //         </Container>
                //     </Main>
                // ) :
                // <Redirect to={"/"}/>


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

const Main = styled.div`
  display: grid;
  grid-template-columns: 67px auto;
  height: 100vh;
  border-radius: 10px;
  background-color: white;
`;
// const Container = styled.div`
//   //display: grid;
//   //grid-template-rows: 125px auto;
// `;
// const NavigationTab = styled.div`
//   border-bottom: 2px solid #dadada;
//   align-self: end;
//
//   & .btnContainer {
//     margin-left: 30px;
//   }
//
//   & button {
//     margin-right: 5px;
//   }
// `;
// const Content = styled.div`
//   & > div {
//     margin-top: 30px;
//   }
// `;


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