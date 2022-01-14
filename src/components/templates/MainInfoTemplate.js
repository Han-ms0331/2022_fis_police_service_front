import React from 'react';
import {Container} from "@mui/material";
import CenterInfo from "../organisms/CenterInfo";
import InfoContainer from "../organisms/InfoContainer";

const CallList = [
    {
        u_name: "한명수",
        in_out: "인",
        dateTime: "2022-01-13",
        participation:"참여",
        c_manager:"홍길동",
        m_ph:"010-1234-1234",
        m_email:"fisolution@naver.com",
        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
    },
    {
        u_name: "한명수",
        in_out: "인",
        dateTime: "2022-01-13",
        participation:"참여",
        c_manager:"홍길동",
        m_ph:"010-1234-1234",
        m_email:"fisolution@naver.com",
        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심",
        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
    },
    {
        u_name: "한명수",
        in_out: "인",
        dateTime: "2022-01-13",
        participation:"참여",
        c_manager:"홍길동",
        m_ph:"010-1234-1234",
        m_email:"fisolution@naver.com",
        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심",
        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
    }
]

const AgentList = [
    {
        a_code: "안양1 한명수",
        estimate_num: "50",
        visit_date: "2022-02-13",
        visit_time:"9:00",
        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심",
        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
    }
]



function MainInfoTemplate(props) {
    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", height:"100vh"}}>
            <Container fixed>
                <CenterInfo />
            </Container>
            <Container fixed>
                <InfoContainer type={"call"} content={CallList} u_name={localStorage.getItem("userName")}/>
            </Container>
            <Container fixed>
                <InfoContainer type={"apply"} content={AgentList} u_name={localStorage.getItem("userName")}/>
            </Container>
        </div>
    );
}

export default MainInfoTemplate;