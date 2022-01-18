import React, {useState} from 'react';
import {Container} from "@mui/material";
import CenterInfo from "../organisms/CenterInfo";
import InfoContainer from "../organisms/InfoContainer";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";
import CallInputForm from "../organisms/CallInputForm";

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
    const [currentInfo, setCurrentInfo] = useState({
        u_name: "",
        in_out: "",
        dateTime: "",
        participation: "",
        c_manager: "",
        m_ph: "",
        m_email: "",
        center_etc: "",
        agent_etc: ""
    })
    const [callList, setCallList] = useState([]);
    const [agentList, setAgentList] = useState([]);




    /*
        날짜: 2022/01/18 1:52 오후
        작성자: 한명수
        작성내용: sendMail - 서버와 메일전송 통신을 하는 부분
    */
    const sendMail = async () => {
        if (window.confirm("메일을 전송하시겠습니까?")) {
            const result = await axios.get('/mail/send')
                .then((res) => {
                    if (res.data.result === "success") {
                        alert("메일 전송에 성공하였습니다.")
                    } else {
                        alert("메일 전송에 실패하였습니다. 잠시후에 다시 실행해 주세요.")
                    }

                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    /*
        날짜: 2022/01/18 1:51 오후
        작성자: 한명수
        작성내용: onClick- 각 버튼들이 클릭되었을 때 실행하는 로직을 담고있음
    */

    const onClick = (e) => {
        if (e.target.name === "open") {
            setIsOpen(true);
        } else if (e.target.name === "mail") {
            sendMail()
        } else if (e.target.name === "cancel") {
            if (window.confirm("작성을 취소하시겠습니까?"))
                setIsOpen(false);
        } else if (e.target.name === "save") {
            if (window.confirm("저장하시겠습니까?"))
                setIsOpen(false);
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "column", height: "99vh", overflow: "auto", width: "550px"}}>
            <Container fixed sx={{marginBottom: "50px"}}>
                <CenterInfo/>
            </Container>
            <Container fixed sx={{marginBottom: "50px"}}>
                <InfoContainer type={"call"} content={CallList} u_name={localStorage.getItem("userName")}/>
                {isOpen ?
                    <div>
                        <div>
                            <CallInputForm data={CallList[1]} currentInfo={currentInfo} setCurrentInfo={setCurrentInfo}/>
                        </div>
                        <div style={{margin: "20px 0px", display: "flex", justifyContent: "space-around"}}>
                            <CustomButton name="cancel" type="normal" width="150px" height="35px" borderRadius="3px"
                                          color="#222"
                                          backgroundColor="#FFD400" content="취소" onClick={onClick}/>
                            <CustomButton name="save" type="normal" width="150px" height="35px" borderRadius="3px"
                                          color="#222"
                                          backgroundColor="#FFD400" content="저장" onClick={onClick}/>
                        </div>
                    </div>
                    :
                    <div style={{marginTop: "20px", display: "flex", justifyContent: "space-around"}}>
                        <CustomButton name="open" type="normal" width="150px" height="35px" borderRadius="3px"
                                      color="#222"
                                      backgroundColor="#FFD400" content="연락기록 추가" onClick={onClick}/>
                        <CustomButton name="mail" type="normal" width="150px" height="35px" borderRadius="3px"
                                      color="#222"
                                      backgroundColor="#FFD400" content="메일 전송" onClick={onClick}/>
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