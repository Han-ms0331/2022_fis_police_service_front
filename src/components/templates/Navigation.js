import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import styled from 'styled-components';
import {Button, IconButton} from "@material-ui/core";
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

/*
    날짜: 2022/01/10 3:59 오후
    작성자: 한명수
    작성내용: Navigation 1차 완성
*/

/*
날짜: 2022/01/12 11:56 AM
작성자: 정도식
작성내용: Navigation 2차 작성
*/

/*
    날짜: 2022/01/13 10:28 오전
    작성자: 한명수
    작성내용: Navigation 로그아웃 기능 수정
*/
const Navigation = () => {
        const [isLogout, setIsLogout] = useState(false);    //로그아웃의 flag
    /*
        날짜: 2022/01/12 2:07 오후
        작성자: 한명수
        작성내용: 로그아웃 버튼이 눌렸을 시 작동하는 함수
    */
    const onLogout = (e) => {
        if (window.confirm("정말 로그아웃 하시겠습니까?")) {
            localStorage.removeItem("loginStatus"); //로그아웃 상태를 저장하는 localStorage의 loginStatus를 제거
            localStorage.removeItem("userName"); //로그아웃 상태를 저장하는 localStorage의 loginStatus를 제거
            setIsLogout(true)   //로그아웃 flag를 true로 변환하여 redirect시킴
        }
    }
    return (
        isLogout?
            <Redirect to={"/"}/>    //로그아웃이 눌리면 redirect
            :
        <Container>
            <Upper>
                <Link to={"/main"}> <HomeIcon className="icon"/> </Link> {/*시설관리*/}
                <Link to={"/schedule"}> <EventAvailableIcon className="icon"/> </Link> {/*일정조회*/}
                <Link to={"/manage"}> <PersonIcon className="icon"/> </Link> {/*관리자*/}
            </Upper>

            <Bottom>
                <LogoutIcon className="icon" onClick={onLogout}/>{/*로그아웃*/}
            </Bottom>
        </Container>
    )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  border-right: 2px solid #eee;
  padding: 0px;
  & .icon {
    color: #FFD400;
    font-size: 1.8vw;
  }
  & .icon:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

`;
const Upper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  justify-self: center;
  margin-top: 3vh;
`;

const Bottom = styled.div`
  align-self: end;
  justify-self: center;
  margin-bottom: 2rem;
`;
export default Navigation;