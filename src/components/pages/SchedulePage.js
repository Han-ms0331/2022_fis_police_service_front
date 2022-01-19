import React, {useState} from 'react';
import styled from 'styled-components';
import Navigation from "../templates/Navigation";
import ScheduleBody from "../templates/ScheduleBody";
import ScheduleSidebar from "../templates/ScheduleSidebar";
import {GoChevronLeft, GoChevronRight} from "react-icons/go"; // 접을 때 필요한 아이콘
import {Redirect} from "react-router-dom";
import {isLoginedState} from "../../store/LoginStore";
import {useRecoilValue} from "recoil";
/*
날짜: 2022/01/12 11:51 AM
작성자: 정도식
작성내용: grid로 레에아웃 변경
*/
/*
날짜: 2022/01/14 1:14 PM
작성자: 정도식
작성내용: Sidebar 접히는 기능 오류 해결
*/
const SchedulePage = (props) => {

    const isLogined = useRecoilValue(isLoginedState);

    const[isSidebarOpen,setIsSidebarOpen] = useState(true);

    const toggleSideBar=()=>{ /*사이드바 토글 함수*/
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        isLogined ?     //isLogined가 false면 redirect를 시킴
            <Main isSidebarOpen={isSidebarOpen}>
                <Navigation/>
                <div className="sidebar" isSidebarOpen={isSidebarOpen}>
                        <ScheduleSidebar isSidebarOpen={isSidebarOpen}/>
                        {isSidebarOpen ? <GoChevronLeft className="icon" onClick={toggleSideBar}/> :
                                            <GoChevronRight className="icon" onClick={toggleSideBar}/>}
                </div>
                <ScheduleBody/>
            </Main>
            :
            <Redirect to={"/login"}/>
    );
}

// ===========style===========
const Main = styled.div`
  display: grid;
  grid-template-columns: ${(props)=>props.isSidebarOpen===true?'67px 305px auto':'67px 0px auto'};
  height: 100vh;

  & .sidebar{ //Sidebar
    border-right: ${(props)=> props.isSidebarOpen===true?'2px solid #eee':'none'};
    position: relative;
    
    &>div{ //사이드바 내용
      display: ${(props)=> props.isSidebarOpen===true?'block':'none'};
    }
    
    & .icon{
      color: #999999;
      font-size: 29px;
      position: absolute;
      top: 550px;
      right: -16px;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 16px;
      cursor: pointer;
    }
  }
`;
export default SchedulePage;
