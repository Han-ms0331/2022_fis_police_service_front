import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginedState, userAuthority} from "../../store/LoginStore";
import {Style} from "../../Style";
import NetworkConfig from "../../configures/NetworkConfig";
import Swal from "sweetalert2";
import ListAltIcon from '@mui/icons-material/ListAlt';
/*
    날짜: 2022/01/10 3:59 오후
    작성자: 한명수
    작성내용: Navigation 1차 완성
*/
/*
    날짜: 2022/01/13 10:28 오전
    작성자: 한명수
    작성내용: Navigation 로그아웃 기능 수정
*/
/*
날짜: 2022/01/14 11:06 AM
작성자: 정도식
작성내용: Navigation 픽셀로 고정
*/
/*
날짜: 2022/01/24 10:44 AM
작성자: 정도식
작성내용: authority에 따른 다른 뷰 작성
*/

const Navigation = () => {
    const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
    const authority = useRecoilValue(userAuthority);
    /*
        날짜: 2022/01/12 2:07 오후
        작성자: 한명수
        작성내용: 로그아웃 버튼이 눌렸을 시 작동하는 함수
    */

    const logoutFunction = async () => {
        await axios.post(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/logout`, {}, {withCredentials: true})
            .then((res) => {
                localStorage.removeItem("login-state"); //로그아웃 상태를 저장하는 localStorage의 loginStatus를 제거
                setIsLogined(false);
            }).catch(err => {
                if (err.response.status === 401) {
                    Swal.fire({
                        icon: "warning",
                        title: "세션이 만료되었습니다.",
                        text: "다시 로그인 해주세요.",
                        confirmButtonText: "확인",
                        confirmButtonColor: Style.color2
                    });
                    setIsLogined(false);
                }else{
                    Swal.fire({
                        icon: "warning",
                        title: "서버오류입니다.",
                        text: "잠시 후 재시도해주세요.",
                        confirmButtonText: "확인",
                        confirmButtonColor: Style.color2
                    })
                }
            })
    }

    const onLogout = async (e) => {
        Swal.fire({
            title: '정말 로그아웃 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: Style.color2,
            cancelButtonColor: "#e55039",
            confirmButtonText: '확인',
            cancelButtonText: "취소"
        }).then((result) => {
            if (result.isConfirmed) {
                logoutFunction();
            }
        })
    }
    return (
        <Container>
            <Upper>
                <Link to={"/main"}> <HomeIcon className="icon"/> </Link> {/*시설관리*/}
                <Link to={"/hope"}> <ListAltIcon className="icon"/> </Link> {/*시설관리*/}
                <Link to={"/schedule"}> <EventAvailableIcon className="icon"/> </Link> {/*일정조회*/}
                {authority === 'ADMIN' ? <Link to={"/manage"}> <PersonIcon className="icon"/> </Link> : null} {/*관리자*/}
            </Upper>

            <Bottom>
                <LogoutIcon className="icon" onClick={onLogout}/>{/*로그아웃*/}
            </Bottom>
        </Container>
    )
}
//style
const Container = styled.div`
  display: grid;
  grid-template-rows: 380px auto;
  border-right: 2px solid #eee;
  padding: 0px;

  & .icon {
    //color: #FFD400;
    color: ${Style.color2};
    font-size: 42px;
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
  margin-top: 70px;
`;

const Bottom = styled.div`
  align-self: end;
  justify-self: center;
  margin-bottom: 45px;
`;
export default Navigation;