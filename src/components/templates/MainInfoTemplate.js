import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import CenterInfo from "../organisms/CenterInfo";
import InfoContainer from "../organisms/InfoContainer";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";
import CallInputForm from "../organisms/CallInputForm";
import {useRecoilValue} from "recoil";
import {SelectedCenterCallList, SelectedCenterId, SelectedCenterScheduleList} from "../../store/SelectedCenterStore";
import {Style} from "../../Style";
import Box from "@mui/material/Box";
import UserManageInputForm from "../organisms/UserManageInputForm";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import question from '../media/question.png';
import NetworkConfig from "../../configures/NetworkConfig";
import ScheduleInputForm from "../organisms/ScheduleInputForm";
import {ClickedAgentInfo} from "../../store/SelectedAgentStore";

function MainInfoTemplate(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const clickedAgentInfo = useRecoilValue(ClickedAgentInfo)
    const [currentInfo, setCurrentInfo] = useState({
        in_out: "",
        dateTime: "",
        participation: "",
        c_manager: "",
        m_ph: "",
        m_email: "",
        center_etc: "",
        agent_etc: ""
    })
    const [currentScheduleInfo, setCurrentScheduleInfo] = useState({
        receipt_date: "",
        visit_date: "",
        visit_time: "",
        estimate_num: "",
        center_etc: "",
        agent_etc: ""
    })
    const center_id = useRecoilValue(SelectedCenterId);
    const callList = useRecoilValue(SelectedCenterCallList);
    const scheduleList = useRecoilValue(SelectedCenterScheduleList);

    const {isSelected} = props;

    useEffect(() => {
        setIsOpen(false);
        setCurrentInfo({
            in_out: "",
            dateTime: "",
            participation: "",
            c_manager: "",
            m_ph: "",
            m_email: "",
            num: "",
            center_etc: "",
            agent_etc: ""
        })
        setIsScheduleOpen(false);
        setCurrentScheduleInfo({
            receipt_date: "",
            visit_date: "",
            visit_time: "",
            estimate_num: "",
            center_etc: "",
            agent_etc: ""
        })
    }, [props.isSelected])


    /*
        날짜: 2022/01/24 2:12 오후
        작성자: 한명수
        작성내용: 일정 저장 버튼이 눌렸을 때 작동하는 함수
    */
    const onSaveSchedule = async () =>{
        console.log(currentScheduleInfo.visit_time+":00");
        await axios.post(`http://${NetworkConfig.networkAddress}:8080/schedule`, {
            center_id: center_id,
            agent_id: clickedAgentInfo.agent_id,
            receipt_date: currentScheduleInfo.receipt_date,
            visit_date: currentScheduleInfo.visit_date,
            visit_time: currentScheduleInfo.visit_time+":00",
            estimate_num: currentScheduleInfo.estimate_num,
            center_etc: currentScheduleInfo.center_etc,
            agent_etc: currentScheduleInfo.agent_etc
        }, {withCredentials: true})
            .then((res) => {
                setCurrentScheduleInfo({
                    receipt_date: "",
                    visit_date: "",
                    visit_time: "",
                    estimate_num: "",
                    center_etc: "",
                    agent_etc: ""
                })
                console.log(res);
                alert("저장되었습니다")
            })
    }


    /*
        날짜: 2022/01/18 6:23 오후
        작성자: 한명수
        작성내용: 콜 기록 저장 버튼이 눌렸을 때 작동하는 함수
    */
    const onSaveCall = async () => {
        await axios.post(`http://${NetworkConfig.networkAddress}:8080/call`, {
            center_id: center_id,
            u_name: currentInfo.u_name,
            in_out: currentInfo.in_out,
            dateTime: currentInfo.dateTime,
            participation: currentInfo.participation,
            c_manager: currentInfo.c_manager,
            m_ph: currentInfo.m_ph,
            m_email: currentInfo.m_email,
            num: "",
            center_etc: currentInfo.center_etc,
            agent_etc: currentInfo.agent_etc
        }, {withCredentials: true})
            .then((res) => {
                setCurrentInfo({
                    in_out: "",
                    dateTime: "",
                    participation: "",
                    c_manager: "",
                    m_ph: "",
                    m_email: "",
                    num: "",
                    center_etc: "",
                    agent_etc: ""
                })
                console.log(res);
                alert("저장되었습니다")
            })
    }


    /*
        날짜: 2022/01/18 1:52 오후
        작성자: 한명수
        작성내용: sendMail - 서버와 메일전송 통신을 하는 부분
    */
    const sendMail = async () => {
        if (window.confirm("메일을 전송하시겠습니까?")) {
            const result = await axios.get(`http://${NetworkConfig.networkAddress}:8080/center/${center_id}/sendmail`)
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
            if (callList[0] !== undefined) {
                setCurrentInfo({
                    u_name: callList[0].u_name,
                    in_out: callList[0].in_out,
                    dateTime: callList[0].dateTime,
                    participation: callList[0].participation,
                    c_manager: callList[0].c_manager,
                    m_ph: callList[0].m_ph,
                    m_email: callList[0].m_email,
                    num: "",
                    center_etc: callList[0].center_etc,
                    agent_etc: callList[0].agent_etc
                })
            }
            setIsOpen(true);
        } else if (e.target.name === "mail") {
            sendMail()
        } else if (e.target.name === "cancel") {
            if (window.confirm("작성을 취소하시겠습니까?"))
                setIsOpen(false);
        } else if (e.target.name === "save") {
            if (window.confirm("저장하시겠습니까?")) {
                onSaveCall()
            }
            setIsOpen(false);
        } else if (e.target.name === "add_schedule") {
            setIsScheduleOpen(true);
        }else if (e.target.name === "schedule_save") {
            if (window.confirm("저장하시겠습니까?")) {
                onSaveSchedule()
            }
            setIsScheduleOpen(false);
        }else if (e.target.name === "schedule_cancel") {
            setIsScheduleOpen(false);
        }
    }

    return (

        isSelected ?
            <div style={{
                display: "flex",
                flexDirection: "column",
                height: "99vh",
                width: "650px",
                overflow: "auto",
                marginTop: "32px"
            }}>
                <Container fixed sx={{marginBottom: "50px"}}>
                    <CenterInfo/>
                </Container>
                <Container fixed sx={{marginBottom: "50px"}}>
                    <InfoContainer type={"call"} content={callList} u_name={localStorage.getItem("userName")}/>
                    {isOpen ?

                        <Modal
                            open={isOpen}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <ModalContainer>
                                    <CallInputForm data={callList[0]} currentInfo={currentInfo}
                                                   setCurrentInfo={setCurrentInfo}/>

                                </ModalContainer>
                            </Box>
                        </Modal>

                        :
                        <div style={{marginTop: "20px", display: "flex", justifyContent: "space-around"}}>
                            <CustomButton name="open" type="normal" width="150px" height="35px" borderRadius="3px"
                                          color={Style.color1}
                                          backgroundColor={Style.color2} content="연락기록 추가" onClick={onClick}/>
                            <CustomButton name="mail" type="normal" width="150px" height="35px" borderRadius="3px"
                                          color={Style.color1}
                                          backgroundColor={Style.color2} content="메일 전송" onClick={onClick}/>
                        </div>
                    }
                </Container>
                <Container fixed>
                    <InfoContainer type={"apply"} content={scheduleList} u_name={localStorage.getItem("userName")}/>
                    <div style={{margin: "30px 0px", display: "flex", justifyContent: "space-around"}}>
                        <CustomButton name="add_schedule" type="reverse" width="300px" height="50px" borderRadius="3px"
                                      color={Style.color1}
                                      backgroundColor={Style.color2} content="일정 추가" onClick={onClick}/>
                    </div>
                    <Modal
                        open={isScheduleOpen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <ModalContainer>
                                <ScheduleInputForm data={callList[0]} currentInfo={currentScheduleInfo}
                                               setCurrentInfo={setCurrentScheduleInfo}/>
                                <div style={{margin: "150px 0px", display: "flex", justifyContent: "space-around"}}>
                                    <CustomButton name="schedule_cancel" type="normal" width="150px" height="35px"
                                                  borderRadius="3px"
                                                  color={Style.color1}
                                                  backgroundColor={Style.color2} content="취소" onClick={onClick}/>
                                    <CustomButton name="schedule_save" type="normal" width="150px" height="35px"
                                                  borderRadius="3px"
                                                  color={Style.color1}
                                                  backgroundColor={Style.color2} content="저장" onClick={onClick}/>
                                </div>
                            </ModalContainer>
                        </Box>
                    </Modal>
                </Container>
            </div>
            :
            <RightContainer>
                <p>시설을 선택해 주세요!</p>
                <img src={question} alt={'?'}></img>
            </RightContainer>

    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '750px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const RightContainer = styled.div`
  min-height: 100%;
  width: 646px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  color: #a8a8a8;

  & img {
    width: 75px;
    color: #a8a8a8;
  }
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default MainInfoTemplate;