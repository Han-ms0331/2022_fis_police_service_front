import React, {useState} from 'react';
import styled from 'styled-components';
import Navigation from "../templates/Navigation";
import {Redirect} from "react-router-dom";
import CenterManageTemp from "../templates/CenterManageTemp";
import CustomButton from "../atoms/CustomButton";
import UserManageTemplate from "../templates/UserManageTemplate";
import AgentManageTemplate from "../templates/AgentManageTemplate";
import {useRecoilValue} from "recoil";
import {isLoginedState} from "../../store/LoginStore";

import {Style} from "../../Style";


/*
날짜: 2022/01/13 3:53 PM
작성자: 정도식
작성내용: manage page 작성
*/

function ManagePage(props) {
    const [whichTab, setWhichTab] = useState("userManage");
    const renderTab = (tab) => {
        switch (tab) {
            case 'userManage':
                return <UserManageTemplate/>
            case 'agentManage':
                return <AgentManageTemplate/>
            case 'centerManage':
                return <CenterManageTemp/>
        }
    }
    const handdleClick = (tab, event) => { /*상단 네비게이션 메뉴를 클릭했을 때 state변경*/
        console.log(event.target.parentNode.childNodes[0]);

        const tabs = event.target.parentNode.childNodes;
        console.log(tabs);
        tabs.forEach((tab) => {
            if (event.target === tab) {
                console.log("hi")
                tab.setAttribute("color", "#2E3C7E");
                tab.setAttribute("background-color", "#FCF6F5");
            } else {
                console.log("bye")
                tab.setAttribute("color", "#FCF6F5");
                tab.setAttribute("background-color", "#2E3C7E");

            }

        })


        setWhichTab(tab);
    }
    return (
        <Main>
            <Navigation/>
            <Container>
                <NavigationTab>
                    <div className="btnContainer">
                        <CustomButton class="userManage" type="normal" width="150px" height="35px"
                                      borderRadius="3px" color={Style.color1} backgroundColor={Style.color2}
                                      content="콜직원관리" onClick={(event) => handdleClick("userManage", event)}/>
                        <CustomButton class="agentManage" type="normal" width="150px" height="35px"
                                      borderRadius="3px" color={Style.color2} backgroundColor={Style.color1}
                                      content="현장요원관리" onClick={(event) => handdleClick("agentManage", event)}/>
                        <CustomButton class="centerManage" type="normal" width="150px" height="35px"
                                      borderRadius="3px" color={Style.color2} backgroundColor={Style.color1}
                                      content="시설정보수정"
                                      onClick={(event) => handdleClick("centerManage", event)}/>
                    </div>
                </NavigationTab>
                <Content>
                    {renderTab(whichTab)}
                </Content>
            </Container>
        </Main>
    );

}

const Main = styled.div`
  display: grid;
  grid-template-columns: 67px auto;
  height: 100vh;
  border-radius: 10px;
  background-color: white;
`;
const Container = styled.div`
  display: grid;
  grid-template-rows: 125px auto;
`;
const NavigationTab = styled.div`
  border-bottom: 2px solid #dadada;
  align-self: end;

  & .btnContainer {
    margin-left: 30px;
  }

  & button {
    margin-right: 5px;
  }
`;
const Content = styled.div`
  & > div {
    margin-top: 30px;
  }
`;
export default ManagePage;