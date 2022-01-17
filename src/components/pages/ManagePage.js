import React,{useState} from 'react';
import styled from 'styled-components';
import Navigation from "../templates/Navigation";
import {Redirect} from "react-router-dom";
import CenterManageTemp from "../templates/CenterManageTemp";
import CustomButton from "../atoms/CustomButton";
import UserManageInputForm from "../organisms/UserManageInputForm";
import UserManageTemplate from "../templates/UserManageTemplate";
import AgentManageTemplate from "../templates/AgentManageTemplate";

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

    const [whichTab,setWhichTab] = useState("userManage");
    const renderTab = (tab) =>{
        switch (tab) {
            case 'userManage':
                return <UserManageTemplate/>
            case 'agentManage':
                return <AgentManageTemplate/>
            case 'centerManage':
                return <CenterManageTemp/>
        }
    }
    const handdleClick = (tab) =>{
        setWhichTab(tab);
        console.log(whichTab)
    }
    return (
        isLogined ?     //isLogined가 false면 redirect를 시킴
            (
                <Main>
                    <Navigation/>
                    <Container>
                        <NavigationTab>
                            <div className="btnContainer">
                                <CustomButton  class= "userManage" type = "normal" width="150px" height= "35px" borderRadius="3px" color="#222" backgroundColor="#F8EFBA" content="콜직원관리" onClick={()=>handdleClick("userManage")}/>
                                <CustomButton  class= "agentManage" type = "normal" width="150px" height= "35px" borderRadius="3px" color="#222" backgroundColor="#F8EFBA" content="현장요원관리" onClick={()=>handdleClick("agentManage")}/>
                                <CustomButton  class= "centerManage" type = "normal" width="150px" height= "35px" borderRadius="3px" color="#222" backgroundColor="#F8EFBA" content="시설정보수정" onClick={()=>handdleClick("centerManage")}/>
                            </div>
                        </NavigationTab>
                        <Content>
                            {renderTab(whichTab)}
                        </Content>
                    </Container>
                </Main>
            ) :
            <Redirect to={"/"}/>

    );

}

const Main = styled.div`
  display: grid;
  grid-template-columns: 67px auto;
  height: 100vh;
`;
const Container = styled.div`
display: grid;
  grid-template-rows: 1fr 12fr;
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
&>div{
  margin-top: 30px;
}
`;
export default ManagePage;