import React, {useEffect, useState} from 'react';
import CenterInfo from "../organisms/CenterInfo";
import InfoContainer from "../organisms/InfoContainer";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";
import CallInputForm from "../organisms/CallInputForm";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    CenterList, CenterLocation,
    SelectedCenterCallList,
    SelectedCenterId, SelectedCenterInfo, SelectedCenterList,
    SelectedCenterScheduleList
} from "../../store/SelectedCenterStore";
import {Style} from "../../Style";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import question from '../media/question.png';
import NetworkConfig from "../../configures/NetworkConfig";
import ScheduleInputForm from "../organisms/ScheduleInputForm";
import {ClickedAgentInfo} from "../../store/SelectedAgentStore";
import Swal from "sweetalert2";
import '../atoms/swal.css'
import {isLoginedState} from "../../store/LoginStore";


function MainInfoTemplate(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const clickedAgentInfo = useRecoilValue(ClickedAgentInfo)
    const [currentInfo, setCurrentInfo] = useState({
        in_out: "",
        dateTime: "",
        participation: "",
        c_manager: "",
        m_ph: "",
        m_email: "",
        email_form: "",
        center_etc: "",
        agent_etc: ""
    })
    const [currentScheduleInfo, setCurrentScheduleInfo] = useState({
        receipt_date: "",
        visit_date: "",
        visit_time: "",
        estimate_num: "",
        center_etc: "",
        agent_etc: "",
    })
    const center_id = useRecoilValue(SelectedCenterId);
    const callList = useRecoilValue(SelectedCenterCallList);
    const scheduleList = useRecoilValue(SelectedCenterScheduleList);
    const [centerLocation, setCenterLocation] = useRecoilState(CenterLocation);   //선택된 시설의 위 경도 정보
    const [selectedCenterId, setSelectedCenterId] = useRecoilState(SelectedCenterId);
    const [selectedCenterInfo, setSelectedCenterInfo] = useRecoilState(SelectedCenterInfo);
    const [selectedCenterCallList, setSelectedCenterCallList] = useRecoilState(SelectedCenterCallList);
    const [selectedCenterScheduleList, setSelectedCenterScheduleList] = useRecoilState(SelectedCenterScheduleList);
    const [selectedCenterList, setSelectedCenterList] = useRecoilState(SelectedCenterList);
    const [clickedAgent, setClickedAgent] = useRecoilState(ClickedAgentInfo);
    const {isSelected} = props;
    const setIsLogined = useSetRecoilState(isLoginedState)
    const onRefresh = async (e) => {
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/center/select?center_id=${selectedCenterId}`, {withCredentials: true})
            .then((res) => {
                setSelectedCenterId(res.data.data.center_id)//현재 선택된 시설의 아이디 전역으로 저장
                setSelectedCenterInfo({ //centerInfo에 들어갈 내용 저장(이름, 주소, 전화번호)
                    center_id: res.data.data.center_id,
                    c_name: res.data.data.c_name,
                    c_address: res.data.data.c_address,
                    c_ph: res.data.data.c_ph,
                    c_people: res.data.data.c_people
                })
                setSelectedCenterCallList(res.data.data.callList.reverse())//callList에서 뜰 리스트 저장
                setSelectedCenterScheduleList(res.data.data.scheduleList.reverse())//scheduleList에서 뜰 내용 저장
                setCenterLocation([res.data.data.c_latitude, res.data.data.c_longitude]);
                setSelectedCenterList(res.data.data.centerList);
                setClickedAgent({});
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    Swal.fire({
                        icon: "warning",
                        title: "세션이 만료되었습니다.",
                        text: "다시 로그인 해주세요.",
                        confirmButtonText: "확인",
                        confirmButtonColor: Style.color2
                    });
                    setIsLogined(false);
                } else {
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

    useEffect(() => {
        setIsOpen(false);
        setCurrentInfo({
            in_out: "",
            dateTime: "",
            participation: "",
            c_manager: "",
            m_ph: "",
            m_email: "",
            email_form: "",
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

    const onSaveSchedule = () => {
        Swal.fire({
            icon: "question",
            title: '저장하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true,
            confirmButtonColor: Style.color2,
            cancelButtonColor: "#e55039",
            preConfirm: async () => {
                await axios.post(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/schedule`, {
                    center_id: center_id,
                    agent_id: clickedAgentInfo.agent_id,
                    receipt_date: currentScheduleInfo.receipt_date,
                    visit_date: currentScheduleInfo.visit_date,
                    visit_time: currentScheduleInfo.visit_time + ":00",
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
                        Swal.fire({
                            icon: "success",
                            title: "저장되었습니다.",
                            confirmButtonColor: Style.color2,
                            confirmButtonText: "확인"
                        })
                        setIsScheduleOpen(false);
                        onRefresh();
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
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "실패하였습니다.",
                                confirmButtonColor: Style.color2,
                                confirmButtonText: "확인"
                            })
                        }
                    })


            }
            ,
            allowOutsideClick: () => !Swal.isLoading()
        })
    }


    /*
        날짜: 2022/01/18 6:23 오후
        작성자: 한명수
        작성내용: 콜 기록 저장 버튼이 눌렸을 때 작동하는 함수
    */

    const onSaveCall = () => {
        Swal.fire({
            icon: "question",
            title: '저장하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true,
            confirmButtonColor: Style.color2,
            cancelButtonColor: "#e55039",
            preConfirm: async () => {
                await axios.post(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/call`, {
                    center_id: center_id,
                    u_name: currentInfo.u_name,
                    in_out: currentInfo.in_out,
                    dateTime: currentInfo.dateTime,
                    participation: currentInfo.participation,
                    c_manager: currentInfo.c_manager,
                    m_ph: currentInfo.m_ph,
                    m_email: currentInfo.email_form === "직접입력" ? currentInfo.m_email : currentInfo.m_email + "@" + currentInfo.email_form,
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
                            email_form: "",
                            num: "",
                            center_etc: "",
                            agent_etc: ""
                        })
                        Swal.fire({
                            icon: "success",
                            title: "저장되었습니다.",
                            confirmButtonColor: Style.color2,
                            confirmButtonText: "확인"
                        })
                        setIsOpen(false);
                        onRefresh();
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
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "실패하였습니다.",
                                confirmButtonColor: Style.color2,
                                confirmButtonText: "확인"
                            })
                        }
                    })


            }
            ,
            allowOutsideClick: () => !Swal.isLoading()
        })
    }


    /*
        날짜: 2022/01/18 1:52 오후
        작성자: 한명수
        작성내용: sendMail - 서버와 메일전송 통신을 하는 부분
    */

    const
        sendMail = () => {
        Swal.fire({
            icon: "question",
            title: '메일을 보내시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true,
            confirmButtonColor: Style.color2,
            cancelButtonColor: "#e55039",
            preConfirm: async () => {
                await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/center/${center_id}/sendmail`, {withCredentials: true})
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "메일 전송에 성공하였습니다.",
                            confirmButtonColor: Style.color2,
                            confirmButtonText: "확인"
                        })
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            Swal.fire({
                                icon: "warning",
                                title: "세션이 만료되었습니다.",
                                text: "다시 로그인 해주세요.",
                                confirmButtonText: "확인",
                                confirmButtonColor: Style.color2
                            });
                            setIsLogined(false);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "메일 전송에 실패하였습니다.",
                                text: "잠시후에 다시 실행해 주세요.",
                                confirmButtonColor: Style.color2,
                                confirmButtonText: "확인"
                            })
                        }
                    })
            }
            ,
            allowOutsideClick: () => !Swal.isLoading()
        })
    }


    /*
        날짜: 2022/01/18 1:51 오후
        작성자: 한명수
        작성내용: onClick- 각 버튼들이 클릭되었을 때 실행하는 로직을 담고있음
    */
    const onClick = (e) => {
        console.log("onclick inside");
        console.log(e.target.name);
        if (e.target.name === "open") {
            if (callList[0] !== undefined) {
                let mail = callList[0].m_email.split("@");
                setCurrentInfo({
                    u_name: callList[0].u_name,
                    in_out: callList[0].in_out,
                    dateTime: callList[0].dateTime,
                    participation: callList[0].participation,
                    c_manager: callList[0].c_manager,
                    m_ph: callList[0].m_ph,
                    m_email: mail[0],
                    email_form: mail[1],
                    num: "",
                    center_etc: callList[0].center_etc,
                    agent_etc: callList[0].agent_etc
                })
            }
            setIsOpen(true);
        } else if (e.target.name === "mail") {
            sendMail()
        } else if (e.target.name === "cancel") {
            Swal.fire({
                title: '작성을 취소하시겠습니까?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: Style.color2,
                cancelButtonColor: "#e55039",
                confirmButtonText: '확인',
                cancelButtonText: "취소"
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsOpen(false);
                }
            })
        } else if (e.target.name === "save") {
            onSaveCall();
        }
         else if (e.target.name === "schedule_save") {
            onSaveSchedule()

        } else if (e.target.name === "schedule_cancel") {
            setIsScheduleOpen(false);
        }
    }

    return (
        isSelected ?
            <Container>
                <CenterInfo/>
                <InfoContainer type={"call"} content={callList} u_name={localStorage.getItem("userName")}/>
                {isOpen ?
                    // <Modal // 연락기록 추가를 눌렀을 경우에 나타나는 모달창
                    //     open={isOpen}
                    //     aria-labelledby="modal-modal-title"
                    //     aria-describedby="modal-modal-description"
                    //     style={{zIndex: 3}}
                    // >
                    //     <Box sx={style}>
                    //         <ModalContainer>
                    <div style={{boxShadow: "3px 3px #dadada"}}>
                        <CallInputForm data={callList[0]} currentInfo={currentInfo}
                                       setCurrentInfo={setCurrentInfo}/>
                        <div style={{margin: "50px 0px", display: "flex", justifyContent: "space-around"}}>
                            <CustomButton name="cancel" type="normal" width="150px" height="35px"
                                          borderRadius="3px"
                                          color={Style.color1}
                                          backgroundColor={Style.color2} content="취소" onClick={onClick}/>
                            <CustomButton name="save" type="normal" width="150px" height="35px"
                                          borderRadius="3px"
                                          color={Style.color1}
                                          backgroundColor={Style.color2} content="저장" onClick={onClick}/>
                        </div>
                    </div>
                    //         </ModalContainer>
                    //     </Box>
                    // </Modal>
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
                <InfoContainer type={"apply"} content={scheduleList}/>
                <div style={{margin: "30px 0px", display: "flex", justifyContent: "space-around"}}>
                    <CustomButton name="add_schedule" type="reverse" width="300px" height="50px" borderRadius="3px"
                                  color={Style.color1}
                                  backgroundColor={Style.color2} content="일정 추가" fontSize={"25px"} onClick={() => {
                        if (clickedAgent.agent_id === undefined) {
                            Swal.fire({
                                icon: "warning",
                                title: "현장요원을 선택해주세요.",
                                confirmButtonText: "확인",
                                confirmButtonColor: Style.color2
                            });
                        } else {
                            setIsScheduleOpen(true);
                        }
                    }}/>
                </div>
                <Modal
                    open={isScheduleOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{zIndex: 3}}
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
            :
            <RightContainer>
                <p>시설을 선택해 주세요!</p>
                <img src={question} alt={'?'}/>
            </RightContainer>

    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 99vh;
  width: 850px;
  overflow: auto;
  margin-top: 30px;

  & > div {
    min-width: 580px;
    margin-top: 30px;
  }
`;
const style = { //모딜창 스타일
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '600px',
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