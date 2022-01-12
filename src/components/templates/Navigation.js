import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
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
function Navigation(props) {
    const [isLogout, setIsLogout] = useState(false);    //로그아웃의 flag
    /*
        날짜: 2022/01/12 2:07 오후
        작성자: 한명수
        작성내용: 로그아웃 버튼이 눌렸을 시 작동하는 함수
    */
    const onLogout = (e) => {
        if (window.confirm("정말 로그아웃 하시겠습니까?")) {
            localStorage.removeItem("loginStatus"); //로그아웃 상태를 저장하는 localStorage의 loginStatus를 제거
            setIsLogout(true)   //로그아웃 flag를 true로 변환하여 redirect시킴
        }
    }

    return (
        isLogout ?
            <Redirect to={"/"}/>    //로그아웃이 눌리면 redirect
            :
            <div style={{
                width: "7vw",
                display: "grid",
                gridTemplateRows: "50vh 50vh",
                gridTemplateColumns: "6vw",
                borderRight: "1px solid #6D5A00"
            }}>
                <div className={"upper_container"}>
                    <div>
                        <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/main"}>
                            <div>
                                <IconButton style={{color: "#FFD400"}}>
                                    <HomeIcon fontSize={"large"}/>
                                </IconButton>
                                <div style={{textAlign: "center"}}>시설관리</div>
                            </div>
                        </Link>
                    </div>
                    <br/>
                    <div>
                        <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/schedule"}>
                            <div>
                                <IconButton style={{color: "#FFD400"}}>
                                    <EventAvailableIcon fontSize={"large"}/>
                                </IconButton>
                                <div style={{textAlign: "center"}}>일정관리</div>
                            </div>
                        </Link>
                    </div>
                    <br/>
                    <div>
                        <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/manage"}>
                            <div>
                                <IconButton style={{color: "#FFD400"}}>
                                    <PersonIcon fontSize={"large"}/>
                                </IconButton>
                                <div style={{textAlign: "center"}}>관리자</div>
                            </div>
                        </Link>
                    </div>
                    <br/>
                </div>
                <div className={"lowerContainer"}
                     style={{display: "grid", girdTemplateRows: "1fr", alignItems: "end", paddingBottom: "5vh"}}>
                    <div>
                        <div>
                            <IconButton style={{color: "#FFD400"}} onClick={onLogout}>
                                <LogoutIcon fontSize={"large"}/>
                            </IconButton>
                            <div style={{textAlign: "center"}}>로그아웃</div>
                        </div>
                    </div>
                </div>
            </div>

    );
}

export default Navigation;