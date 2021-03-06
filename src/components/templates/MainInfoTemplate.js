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
import {ClickedAgentInfo, SelectedAgentInfo} from "../../store/SelectedAgentStore";
import Swal from "sweetalert2";
import '../atoms/swal.css'
import {isLoginedState} from "../../store/LoginStore";
import {SelectedDateState} from "../../store/SelectedDateStore";


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
        m_emailtail: "",
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
    const [centerLocation, setCenterLocation] = useRecoilState(CenterLocation);   //????????? ????????? ??? ?????? ??????
    const [selectedCenterId, setSelectedCenterId] = useRecoilState(SelectedCenterId);
    const [selectedCenterInfo, setSelectedCenterInfo] = useRecoilState(SelectedCenterInfo);
    const [selectedCenterCallList, setSelectedCenterCallList] = useRecoilState(SelectedCenterCallList);
    const [selectedCenterScheduleList, setSelectedCenterScheduleList] = useRecoilState(SelectedCenterScheduleList);
    const [selectedCenterList, setSelectedCenterList] = useRecoilState(SelectedCenterList)
    const [clickedAgent, setClickedAgent] = useRecoilState(ClickedAgentInfo);
    const {isSelected} = props;
    const [date, setDate] = useRecoilState(SelectedDateState);
    const [selectedAgentInfo, setSelectedAgentInfo] = useRecoilState(SelectedAgentInfo);

    const setIsLogined = useSetRecoilState(isLoginedState)

    const onData = async () => {   //??????????????? ???????????? ????????? setRows ??????????????? ??????????????? ???????????? ??????
        let visit_date = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/center/${selectedCenterId}/date?date=${visit_date}`, {withCredentials: true})
            .then((res) => {
                // console.log(res.data)
                setSelectedAgentInfo(() => res.data.data);
                props.setAgentListLoading(false);

            }).catch((err) => {
                if (err.response.status === 401) {
                    Swal.fire({
                        icon: "warning",
                        title: "????????? ?????????????????????.",
                        text: "?????? ????????? ????????????.",
                        confirmButtonText: "??????",
                        confirmButtonColor: Style.color2
                    });
                    setIsLogined(false);
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "?????????????????????.",
                        text: "?????? ??? ?????????????????????.",
                        confirmButtonText: "??????",
                        confirmButtonColor: Style.color2
                    })
                }
            })
    }

    const onRefresh = async (e) => {
        props.setAgentListLoading(true);
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/center/select?center_id=${selectedCenterId}`, {withCredentials: true})
            .then((res) => {
                setSelectedCenterId(res.data.data.center_id)//?????? ????????? ????????? ????????? ???????????? ??????
                setSelectedCenterInfo({ //centerInfo??? ????????? ?????? ??????(??????, ??????, ????????????)
                    center_id: res.data.data.center_id,
                    c_name: res.data.data.c_name,
                    c_address: res.data.data.c_address,
                    c_ph: res.data.data.c_ph,
                    c_people: res.data.data.c_people
                })
                // setSelectedCenterCallList(res.data.data.callList.reverse())//callList?????? ??? ????????? ??????
                setSelectedCenterScheduleList(res.data.data.scheduleList.reverse())//scheduleList?????? ??? ?????? ??????
                // setCenterLocation([res.data.data.c_latitude, res.data.data.c_longitude]);
                // setSelectedCenterList(res.data.data.centerList);
                setClickedAgent({});
                onData();
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    Swal.fire({
                        icon: "warning",
                        title: "????????? ?????????????????????.",
                        text: "?????? ????????? ????????????.",
                        confirmButtonText: "??????",
                        confirmButtonColor: Style.color2
                    });
                    setIsLogined(false);
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "?????????????????????.",
                        text: "?????? ??? ?????????????????????.",
                        confirmButtonText: "??????",
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
            m_emailtail: "",
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
        ??????: 2022/01/24 2:12 ??????
        ?????????: ?????????
        ????????????: ?????? ?????? ????????? ????????? ??? ???????????? ??????
    */

    const onSaveSchedule = () => {
        Swal.fire({
            icon: "question",
            title: '?????????????????????????',
            showCancelButton: true,
            confirmButtonText: '??????',
            cancelButtonText: '??????',
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
                            title: "?????????????????????.",
                            confirmButtonColor: Style.color2,
                            confirmButtonText: "??????"
                        })
                        setIsScheduleOpen(false);
                        onRefresh();
                    }).catch(err => {
                        if (err.response.status === 401) {
                            Swal.fire({
                                icon: "warning",
                                title: "????????? ?????????????????????.",
                                text: "?????? ????????? ????????????.",
                                confirmButtonText: "??????",
                                confirmButtonColor: Style.color2
                            });
                            setIsLogined(false);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "?????????????????????.",
                                confirmButtonColor: Style.color2,
                                confirmButtonText: "??????"
                            })
                        }
                    })


            }
            ,
            allowOutsideClick: () => !Swal.isLoading()
        })
    }


    /*
        ??????: 2022/01/18 6:23 ??????
        ?????????: ?????????
        ????????????: ??? ?????? ?????? ????????? ????????? ??? ???????????? ??????
    */

    const onSaveCall = () => {
        Swal.fire({
            icon: "question",
            title: '?????????????????????????',
            showCancelButton: true,
            confirmButtonText: '??????',
            cancelButtonText: '??????',
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
                    m_email: currentInfo.email_form === "????????????" ? currentInfo.m_email + "@" + currentInfo.m_emailtail : currentInfo.m_email + "@" + currentInfo.email_form,
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
                            m_emailtail: "",
                            email_form: "",
                            num: "",
                            center_etc: "",
                            agent_etc: ""
                        })
                        Swal.fire({
                            icon: "success",
                            title: "?????????????????????.",
                            confirmButtonColor: Style.color2,
                            confirmButtonText: "??????"
                        })
                        setIsOpen(false);
                        onRefresh();
                    }).catch(err => {
                        if (err.response.status === 401) {
                            Swal.fire({
                                icon: "warning",
                                title: "????????? ?????????????????????.",
                                text: "?????? ????????? ????????????.",
                                confirmButtonText: "??????",
                                confirmButtonColor: Style.color2
                            });
                            setIsLogined(false);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "?????????????????????.",
                                confirmButtonColor: Style.color2,
                                confirmButtonText: "??????"
                            })
                        }
                    })


            }
            ,
            allowOutsideClick: () => !Swal.isLoading()
        })
    }


    /*
        ??????: 2022/01/18 1:52 ??????
        ?????????: ?????????
        ????????????: sendMail - ????????? ???????????? ????????? ?????? ??????
    */

    const
        sendMail = () => {
            Swal.fire({
                icon: "question",
                title: '????????? ??????????????????????',
                showCancelButton: true,
                confirmButtonText: '??????',
                cancelButtonText: '??????',
                showLoaderOnConfirm: true,
                confirmButtonColor: Style.color2,
                cancelButtonColor: "#e55039",
                preConfirm: async () => {
                    await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/center/${center_id}/sendmail`, {withCredentials: true})
                        .then((res) => {
                            Swal.fire({
                                icon: "success",
                                title: "?????? ????????? ?????????????????????.",
                                confirmButtonColor: Style.color2,
                                confirmButtonText: "??????"
                            })
                        })
                        .catch((err) => {
                            if (err.response.status === 401) {
                                Swal.fire({
                                    icon: "warning",
                                    title: "????????? ?????????????????????.",
                                    text: "?????? ????????? ????????????.",
                                    confirmButtonText: "??????",
                                    confirmButtonColor: Style.color2
                                });
                                setIsLogined(false);
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "?????? ????????? ?????????????????????.",
                                    text: "???????????? ?????? ????????? ?????????.",
                                    confirmButtonColor: Style.color2,
                                    confirmButtonText: "??????"
                                })
                            }
                        })
                }
                ,
                allowOutsideClick: () => !Swal.isLoading()
            })
        }


    /*
        ??????: 2022/01/18 1:51 ??????
        ?????????: ?????????
        ????????????: onClick- ??? ???????????? ??????????????? ??? ???????????? ????????? ????????????
    */
    const onClick = (e) => {
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
                title: '????????? ?????????????????????????',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: Style.color2,
                cancelButtonColor: "#e55039",
                confirmButtonText: '??????',
                cancelButtonText: "??????"
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsOpen(false);
                }
            })
        } else if (e.target.name === "save") {
            onSaveCall();
        } else if (e.target.name === "schedule_save") {
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
                    // <Modal // ???????????? ????????? ????????? ????????? ???????????? ?????????
                    //     open={isOpen}
                    //     aria-labelledby="modal-modal-title"
                    //     aria-describedby="modal-modal-description"
                    //     style={{zIndex: 3}}
                    // >
                    //     <Box sx={style}>
                    //         <ModalContainer>
                    <div style={{width: "610px", boxShadow: "3px 3px #dadada"}}>
                        <CallInputForm data={callList[0]} currentInfo={currentInfo}
                                       setCurrentInfo={setCurrentInfo}/>
                        <div style={{
                            width: "610px",
                            margin: "50px 0px",
                            display: "flex",
                            justifyContent: "space-around"
                        }}>
                            <CustomButton name="cancel" type="normal" width="150px" height="35px"
                                          borderRadius="3px"
                                          color={Style.color1}
                                          backgroundColor={Style.color2} content="??????" onClick={onClick}/>
                            <CustomButton name="save" type="normal" width="150px" height="35px"
                                          borderRadius="3px"
                                          color={Style.color1}
                                          backgroundColor={Style.color2} content="??????" onClick={onClick}/>
                        </div>
                    </div>
                    //         </ModalContainer>
                    //     </Box>
                    // </Modal>
                    :
                    <div style={{width: "610px", display: "flex", justifyContent: "space-around"}}>
                        <CustomButton name="open" type="normal" width="150px" height="35px" borderRadius="3px"
                                      color={Style.color1}
                                      backgroundColor={Style.color2} content="???????????? ??????" onClick={onClick}/>
                        <CustomButton name="mail" type="normal" width="150px" height="35px" borderRadius="3px"
                                      color={Style.color1}
                                      backgroundColor={Style.color2} content="?????? ??????" onClick={onClick}/>
                    </div>
                }
                <InfoContainer type={"apply"} content={scheduleList}/>
                <div style={{
                    width: "610px",
                    margin: "30px 0px 0px 0px",
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <CustomButton name="add_schedule" type="reverse" width="300px" height="50px" borderRadius="3px"
                                  color={Style.color1}
                                  backgroundColor={Style.color2} content="?????? ??????" fontSize={"25px"} onClick={() => {
                        if (clickedAgent.agent_id === undefined) {
                            Swal.fire({
                                icon: "warning",
                                title: "??????????????? ??????????????????.",
                                confirmButtonText: "??????",
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
                                              backgroundColor={Style.color2} content="??????" onClick={onClick}/>
                                <CustomButton name="schedule_save" type="normal" width="150px" height="35px"
                                              borderRadius="3px"
                                              color={Style.color1}
                                              backgroundColor={Style.color2} content="??????" onClick={onClick}/>

                            </div>
                        </ModalContainer>
                    </Box>
                </Modal>
            </Container>
            :
            <RightContainer>
                <p>????????? ????????? ?????????!</p>
                <img src={question} alt={'?'}/>
            </RightContainer>

    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //height: 100%;
  padding-left: 20px;
  margin-top: 30px;

  & > div {
    min-width: 550px;
    margin-top: 30px;
    box-sizing: border-box;
  }

  & > div:first-child {
    margin-top: 0px;
  }
`;
const style = { //????????? ?????????
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
  //width: 400px;
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