import React, {useEffect, useRef, useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CheckboxContainer from "../molecules/CheckboxContainer";
import CustomButton from "../atoms/CustomButton";
import {Box, Container} from "@mui/material";
import axios from "axios";
import {Style} from "../../Style";
import NetworkConfig from "../../configures/NetworkConfig";
import {useRecoilState, useSetRecoilState} from "recoil";
import {dateSelectedRows, rowCount} from "../../store/DateSelectedRowsStore";
import Swal from "sweetalert2";


function ScheduleModifyInputForm(props) {

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
    const onData = async () => {   //서버로부터 데이터를 받아와 setRows 스테이트에 데이터들을 저장하는 함수
        await axios.get(`http://${NetworkConfig.networkAddress}:8080/schedule?date=${input.visit_date}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data.data);
                setRows(res.data.data);
            })
    }

    const onPatch = async () => {
        if (window.confirm('저장하시겠습니까?')) {
            console.log(input);
            setInput(() => input);
            await axios.patch(`http://${NetworkConfig.networkAddress}:8080/schedule`, {
                visit_date: input.visit_date,
                visit_time: input.visit_time,
                estimate_num: input.estimate_num,
                modified_info: input.modified_info,
                call_check: input.call_check,
                total_etc: input.total_etc
            }, {withCredentials: true})
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
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
    }

    const onCancelFunction = async () => {
        await axios.get(`http://${NetworkConfig.networkAddress}:8080/schedule/cancel?schedule_id=${input.schedule_id}`, {withCredentials: true})
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        onData();
        props.onClickFunction();
        // alert('일정이 취소되었습니다.');
        Swal.fire({
            title: '일정이 취소되었습니다.',
            icon: 'success',
            confirmButtonColor: Style.color2,
            confirmButtonText: '확인',
        })
    }

    const onCancel = () => {
        Swal.fire({
            title: '일정을 취소하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: Style.color2,
            cancelButtonColor: "#e55039",
            confirmButtonText: '확인',
            cancelButtonText: "취소"
        }).then((result) => {
            if (result.isConfirmed) {
                onCancelFunction();
            }
        })
    }


    // useEffect(() => {
    //     console.log("1")
    // }, [input])

    const onChange = (e) => {
        // console.log(e);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInput({
            ...input, // 기존의 input 객체를 복사한 뒤
            [name]: value, // name 키를 가진 값을 value 로 설정
        });
        console.log(input);
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
        // console.dir(e.target)
        const {checked, name} = e.target;
        setCheckBoxInput({
            ...checkboxInput, // 기존의 input 객체를 복사한 뒤
            [name]: checked // name 키를 가진 값을 value 로 설정
        });
        // console.log(checkboxInput)
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
                    <InputContainer labelContent="현장요원코드: " inputName="a_code" inputType="text" width="300px"
                                    rows="1"
                                    defaultValue={input.a_code}
                                    setValueFunction={onChange}/>
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
                                    contents={["미완료", "통화완료", "부재중", "통화오류"]} setValueFunction={onChange}
                    />
                </div>

                <div style={{marginBottom: "20px", display: `${disable.absentCount}`}}>
                    <InputContainer labelContent="부재중 횟수: " inputName="absentCount" inputType="number" width="300px"
                                    defaultValue={input.absentCount}
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px", display: `${disable.errorReason}`}}>
                    <InputContainer labelContent="통화오류 사유: " inputName="errorReason" inputType="text" width="300px"
                                    defaultValue={input.errorReason}
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


                {/*<div style={{marginLeft: "80px"}}>*/}
                {/*    <CheckboxContainer name="applicationForm" setCheckboxInputFunction={onClick} content="신청서 완료"/>*/}
                {/*    <CheckboxContainer name="placeArrangement" setCheckboxInputFunction={onClick} content="장소 마련 완료"/>*/}
                {/*    <CheckboxContainer name="visitDateConfirm" setCheckboxInputFunction={onClick} content="방문일정 확인 완료"/>*/}
                {/*</div>*/}

                <div style={{marginTop: "30px", display: 'flex', justifyContent: 'center'}}>
                    <CustomButton type="normal" width="150px" height="40px" content="일정 취소" color="white"
                                  borderRadius="15px" backgroundColor={Style.color2} onClick={onCancel}/>
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