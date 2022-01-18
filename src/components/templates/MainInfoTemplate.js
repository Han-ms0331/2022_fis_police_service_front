import React, {useState} from 'react';
import {Container} from "@mui/material";
import CenterInfo from "../organisms/CenterInfo";
import InfoContainer from "../organisms/InfoContainer";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";

const CallList = [
    {
        u_name: "한명수",
        in_out: "인",
        dateTime: "2022-01-13",
        participation: "참여",
        c_manager: "홍길동",
        m_ph: "010-1234-1234",
        m_email: "fisolution@naver.com",
        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
    },
    {
        u_name: "한명수",
        in_out: "인",
        dateTime: "2022-01-13",
        participation: "참여",
        c_manager: "홍길동",
        m_ph: "010-1234-1234",
        m_email: "fisolution@naver.com",
        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심",
        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
    },
    {
        u_name: "한명수",
        in_out: "인",
        dateTime: "2022-01-13",
        participation: "참여",
        c_manager: "홍길동",
        m_ph: "010-1234-1234",
        m_email: "fisolution@naver.com",
        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심",
        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
    }
]

const AgentList = [
    {
        a_code: "안양1 한명수",
        estimate_num: "50",
        visit_date: "2022-02-13",
        visit_time: "9:00",
        center_etc: "점심시간에 걸리지않게 약속 잡아달라하심",
        agent_etc: "현장요원 방문시 발열체크 및 백신패스 필수"
    }
]


function MainInfoTemplate(props) {
    const [isOpen, setIsOpen] = useState(false);
    const onAdd = () => {
        setIsOpen((prev) => !prev);
    }

    const onMail = async () => {
        if(window.confirm("정말"))
        await axios.get('/center')
            .then((res) => {
                console.log(res.data)
            })
    }

return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100vh"}}>
        <Container fixed>
            <CenterInfo/>
        </Container>
        <Container fixed>
            <InfoContainer type={"call"} content={CallList} u_name={localStorage.getItem("userName")}/>
            {isOpen ?
                <div style={{marginTop: "20px", display: "flex", justifyContent: "space-around"}}>
                    <CustomButton type="normal" width="150px" height="35px" borderRadius="3px" color="#222"
                                  backgroundColor="#FFD400" content="취소" onClick={onAdd}/>
                    <CustomButton type="normal" width="150px" height="35px" borderRadius="3px" color="#222"
                                  backgroundColor="#FFD400" content="저장" onClick={onAdd}/>
                </div>
                :
                <div style={{marginTop: "20px", display: "flex", justifyContent: "space-around"}}>
                    <CustomButton type="normal" width="150px" height="35px" borderRadius="3px" color="#222"
                                  backgroundColor="#FFD400" content="연락기록 추가" onClick={onAdd}/>
                    <CustomButton type="normal" width="150px" height="35px" borderRadius="3px" color="#222"
                                  backgroundColor="#FFD400" content="메일 전송" onClick={onMail}/>
                </div>
            }
        </Container>
        <Container fixed>
            <InfoContainer type={"apply"} content={AgentList} u_name={localStorage.getItem("userName")}/>
        </Container>
    </div>
);
}

export default MainInfoTemplate;