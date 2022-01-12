import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {Button, IconButton} from "@material-ui/core";
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CustomMap from "../molecules/CustomMap";

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
const Navigation = () => {
    return (
        <Container>
            <Upper>
                <Link to={"/main"}> <HomeIcon className="icon"/> </Link> {/*시설관리*/}
                <Link to={"/schedule"}> <EventAvailableIcon className="icon"/> </Link> {/*일정조회*/}
                <Link to={"/manage"}> <PersonIcon className="icon"/> </Link> {/*관리자*/}
            </Upper>

            <Bottom>
                <Link to={"/"}> <LogoutIcon className="icon"/> </Link> {/*로그아웃*/}
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
// function Navigation(props) {
//     const [currentPage, setCurrentPage] = useState();
//     return (
//         <div style={{ width:"7vw",display: "grid", gridTemplateRows: "50vh 50vh", gridTemplateColumns: "6vw", borderRight:"1px solid #6D5A00"}}>
//             <div className={"upper_container"}>
//                 <div>
//                     <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/main"}>
//                         <div>
//                             <IconButton style={{color: "#FFD400"}}>
//                                 <HomeIcon fontSize={"large"}/>
//                             </IconButton>
//                             <div style={{textAlign: "center"}}>시설관리</div>
//                         </div>
//                     </Link>
//                 </div>
//                 <br/>
//                 <div>
//                     <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/schedule"}>
//                         <div>
//                             <IconButton style={{color: "#FFD400"}}>
//                                 <EventAvailableIcon fontSize={"large"}/>
//                             </IconButton>
//                             <div style={{textAlign: "center"}}>일정관리</div>
//                         </div>
//                     </Link>
//                 </div>
//                 <br/>
//                 <div>
//                     <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/manage"}>
//                         <div>
//                             <IconButton style={{color: "#FFD400"}}>
//                                 <PersonIcon fontSize={"large"}/>
//                             </IconButton>
//                             <div style={{textAlign: "center"}}>관리자</div>
//                         </div>
//                     </Link>
//                 </div>
//                 <br/>
//             </div>
//             <div className={"lowerContainer"}
//                  style={{display: "grid", girdTemplateRows: "1fr", alignItems: "end", paddingBottom: "5vh"}}>
//                 <div>
//                     <Link style={{textDecoration: 'none', color: "black", textAlign: "center"}} to={"/"}>
//                         <div>
//                             <IconButton style={{color: "#FFD400"}}>
//                                 <LogoutIcon fontSize={"large"}/>
//                             </IconButton>
//                             <div style={{textAlign: "center"}}>로그아웃</div>
//                         </div>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }
