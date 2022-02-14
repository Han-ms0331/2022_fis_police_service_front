import React, {useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";
import axios from "axios";
import {Style} from "../../Style";
import NetworkConfig from "../../configures/NetworkConfig";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {dateSelectedRows} from "../../store/DateSelectedRowsStore";
import Swal from "sweetalert2";
import {isLoginedState} from "../../store/LoginStore";
import {userAuthority} from "../../store/LoginStore";


function ScheduleModifyInputForm(props) {

    const authority = useRecoilValue(userAuthority);

    const [input, setInput] = useState({
        ...props.defaultInput
    })

    const [checkboxInput, setCheckBoxInput] = useState({
        applicationForm: false,
        placeArrangement: false,
        visitDateConfirm: false
    })

    const [disable, setDisable] = useState(() => {
        if (input.call_check === "부재중") {
            return ({
                absentCount: "block",
                errorReason: "none"
            })
        } else if (input.call_check === "통화오류") {
            return ({
                absentCount: "none",
                errorReason: "block"
            })
        } else {
            return ({
                absentCount: "none",
                errorReason: "none"
            })
        }

    })

    const setRows = useSetRecoilState(dateSelectedRows);
    const setIsLogined = useSetRecoilState(isLoginedState)
    const onData = async () => {   //서버로부터 데이터를 받아와 setRows 스테이트에 데이터들을 저장하는 함수
        await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/schedule?date=${input.visit_date}`, {withCredentials: true})
            .then((res) => {
                let datas = res.data.data;
                setRows(datas);
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

    const onPatch = async () => {
        Swal.fire({
            icon: "question",
            title: '수정하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true,
            confirmButtonColor: Style.color2,
            cancelButtonColor: "#e55039",
            preConfirm: async () => {
                setInput(() => input);
                await axios.patch(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/schedule`, {
                    schedule_id: input.schedule_id,
                    a_code: input.a_code,
                    center_id: input.center_id,
                    center_etc: input.center_etc,
                    agent_etc: input.agent_etc,
                    call_check_info: input.call_check_info,
                    valid: input.valid,
                    visit_date: input.visit_date,
                    visit_time: input.visit_time,
                    estimate_num: input.estimate_num,
                    modified_info: input.modified_info,
                    call_check: input.call_check,
                    total_etc: input.total_etc,
                    accept: input.accept,
                }, {withCredentials: true})
                    .then((res) => {
                            onData();
                            props.onClickFunction();
                            // alert('저장되었습니다.');
                            Swal.fire({
                                title: '저장되었습니다.',
                                icon: 'success',
                                confirmButtonColor: Style.color2,
                                confirmButtonText: '확인',
                            })
                        }
                    )
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
                        }
                    )


            }
            ,
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    const onCancel = () => {
        Swal.fire({
            icon: "question",
            title: '일정을 취소하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            confirmButtonColor: Style.color2,
            cancelButtonColor: "#e55039",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                setInput(() => input);
                await axios.get(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/schedule/cancel?schedule_id=${input.schedule_id}`, {withCredentials: true})
                    .then((res) => {
                            onData();
                            props.onClickFunction();
                            Swal.fire({
                                title: '일정이 취소되었습니다.',
                                icon: 'success',
                                confirmButtonText: '확인',
                                confirmButtonColor: Style.color2,
                            })
                        }
                    )
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
                        }
                    )
            }
            ,
            allowOutsideClick: () => !Swal.isLoading()
        })
    }


    const onChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInput({
            ...input, // 기존의 input 객체를 복사한 뒤
            [name]: value, // name 키를 가진 값을 value 로 설정
        });
        if (name === "call_check") {
            if (value === "통화완료" || value === "미완료") {
                setDisable({
                    absentCount: "none",
                    errorReason: "none",
                })
            } else if (value === "부재중") {
                setDisable({
                    absentCount: "block",
                    errorReason: "none",
                })
            } else if (value === "통화오류") {
                setDisable({
                    absentCount: "none",
                    errorReason: "block"
                })
            }
        }
    };

    const onClick = (e) => {
        const {checked, name} = e.target;
        setCheckBoxInput({
            ...checkboxInput, // 기존의 input 객체를 복사한 뒤
            [name]: checked // name 키를 가진 값을 value 로 설정
        });
    }


    return (
        <div style={{
            padding: "30px 0px",
            display: "flex",
            justifyContent: "center",
        }}>
            <div style={{marginRight: "30px"}}>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="시설정보: " inputName="c_name" inputType="text" width="300px" rows="2"
                                    defaultValue={input.c_name}
                                    setValueFunction={onChange}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    {authority === "ADMIN" &&
                        <InputContainer labelContent="현장요원코드: " inputName="a_code" inputType="text" width="300px"
                                        rows="1"
                                        defaultValue={input.a_code}
                                        setValueFunction={onChange}/>}
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="방문날짜: " inputName="visit_date" inputType="date" width="300px"
                                    defaultValue={input.visit_date}
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="방문시간: " inputName="visit_time" inputType="time" width="300px"
                                    defaultValue={input.visit_time}
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="예상 인원: " inputName="estimate_num" inputType="number" width="300px"
                                    defaultValue={input.estimate_num}
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="변경사항: " inputName="modified_info" inputType="text" width="300px"
                                    defaultValue={input.modified_info}
                                    rows="3"
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="통화이력: " inputName="call_check" inputType="select" width="300px"
                                    defaultValue={input.call_check}
                                    contents={[{show: "미완료", value: "미완료"}, {show: "통화완료", value: "통화완료"}, {
                                        show: "부재중",
                                        value: "부재중"
                                    }, {show: "통화오류", value: "통화오류"}]} setValueFunction={onChange}
                    />
                </div>

                <div style={{marginBottom: "20px", display: `${disable.absentCount}`}}>
                    <InputContainer labelContent="부재중 횟수: " inputName="call_check_info" inputType="number" width="300px"
                                    defaultValue={input.call_check_info}
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px", display: `${disable.errorReason}`}}>
                    <InputContainer labelContent="통화오류 사유: " inputName="call_check_info" inputType="text" width="300px"
                                    defaultValue={input.call_check_info}
                                    setValueFunction={onChange}/>
                </div>
            </div>
            <div style={{position: "relative"}}>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="특이사항: " inputName="total_etc" inputType="text" width="300px"
                                    rows="3"
                                    defaultValue={input.total_etc}
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="수락/거절: " inputName="accept" inputType="select" width="300px"
                                    defaultValue={input.accept}
                                    contents={[{show: "수락", value: "accept"}, {
                                        show: "거절",
                                        value: "reject"
                                    }, {show: "미확인", value: "TBD"}]} setValueFunction={onChange}
                    />
                </div>

                {/*<div style={{marginLeft: "80px"}}>*/}
                {/*    <CheckboxContainer name="applicationForm" setCheckboxInputFunction={onClick} content="신청서 완료"/>*/}
                {/*    <CheckboxContainer name="placeArrangement" setCheckboxInputFunction={onClick} content="장소 마련 완료"/>*/}
                {/*    <CheckboxContainer name="visitDateConfirm" setCheckboxInputFunction={onClick} content="방문일정 확인 완료"/>*/}
                {/*</div>*/}

                <div style={{marginTop: "30px", display: 'flex', justifyContent: 'center'}}>
                    {authority === "ADMIN" &&
                        <CustomButton type="normal" width="150px" height="40px" content="일정 취소" color="white"
                                      borderRadius="15px" backgroundColor={Style.color2} onClick={onCancel}/>}
                </div>

                <div style={{position: "absolute", bottom: "20px", right: "20px", display: "flex"}}>
                    <div style={{marginRight: "20px"}}>
                        <CustomButton type="reverse" width="150px" height="40px" content="취소" color="black"
                                      border={`1px solid ${Style.color2}`}
                                      borderRadius="15px" backgroundColor="white" onClick={props.onClickFunction}/>
                    </div>

                    <div>
                        <CustomButton type="normal" width="150px" height="40px" content="저장" color="white"
                                      borderRadius="15px" backgroundColor={Style.color2} onClick={onPatch}/>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ScheduleModifyInputForm;