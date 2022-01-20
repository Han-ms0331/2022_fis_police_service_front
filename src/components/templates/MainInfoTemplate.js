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
    const center_id = useRecoilValue(SelectedCenterId);
    const callList = useRecoilValue(SelectedCenterCallList);
    const scheduleList = useRecoilValue(SelectedCenterScheduleList);

    const {isSelected} = props;

    useEffect(()=>{
        setIsOpen(false);
        setCurrentInfo({
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
    },[props.isSelected])


    /*
        날짜: 2022/01/18 6:23 오후
        작성자: 한명수
        작성내용: 저장 버튼이 눌렸을 때 작동하는 함수
    */
    const onSave = async () => {
        console.log(currentInfo);
        await axios.post('/call',{
            id: center_id,
            u_name: currentInfo.u_name,
            in_out: currentInfo.in_out,
            dateTime: currentInfo.dateTime,
            participation: currentInfo.participation,
            c_manager: currentInfo.c_manager,
            m_ph: currentInfo.m_ph,
            m_email: currentInfo.m_email,
            center_etc: currentInfo.center_etc,
            agent_etc: currentInfo.agent_etc
        })
            .then((res)=>{
                setCurrentInfo({
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
                console.log(res.data);
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
            if (callList[0] !== undefined) {
                setCurrentInfo({
                    u_name: callList[0].u_name,
                    in_out: callList[0].in_out,
                    dateTime: callList[0].dateTime,
                    participation: callList[0].participation,
                    c_manager: callList[0].c_manager,
                    m_ph: callList[0].m_ph,
                    m_email: callList[0].m_email,
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
            if (window.confirm("저장하시겠습니까?")){
                onSave()
            }
            setIsOpen(false);
        }
    }

    return (

            isSelected ?
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "99vh",
                    overflow: "auto",
                    width: "550px"
                }}>
                    <Container fixed sx={{marginBottom: "50px"}}>
                        <CenterInfo/>
                    </Container>
                    <Container fixed sx={{marginBottom: "50px"}}>
                        <InfoContainer type={"call"} content={callList} u_name={localStorage.getItem("userName")}/>
                        {isOpen ?
                            <div>
                                <div>
                                    <CallInputForm data={callList[0]} currentInfo={currentInfo}
                                                   setCurrentInfo={setCurrentInfo}/>
                                </div>
                                <div style={{margin: "20px 0px", display: "flex", justifyContent: "space-around"}}>
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
                    </Container>
                </div>
                :
                <div>
                    시설을 선택해 주세요
                </div>

    );
}

export default MainInfoTemplate;