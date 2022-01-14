import React, {useEffect, useRef, useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CheckboxContainer from "../molecules/CheckboxContainer";
import CustomButton from "../atoms/CustomButton";
import {Box, Container} from "@mui/material";

function ScheduleModifyInputForm(props) {
    const [input, setInput] = useState({
        centerInfo: "",
        agentCode: "",
        visitDate: "",
        visitTime: "",
        childrenNumber: "",
        changeThing: "",
        callStatus: "",
        absentCount: "",
        errorReason: "",
        specialInfo: ""
    })

    const [checkboxInput, setCheckBoxInput] = useState({
        applicationForm: false,
        placeArrangement: false,
        visitDateConfirm: false
    })

    const [disable, setDisable] = useState({
        absentCount: "none",
        errorReason: "none"
    })

    // useEffect(() => {
    //     console.log("1")
    // }, [input])

    const onChange = (e) => {
        // console.log(e);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInput({
            ...input, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
        // console.log(input);
        if (name === "callStatus") {
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
                    <InputContainer labelContent="시설정보: " inputName="centerInfo" inputType="text" width="300px" rows="2"
                                    setValueFunction={onChange}  />
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="현장요원코드: " inputName="agentCode" inputType="text" width="300px"
                                    rows="1"
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="방문날짜: " inputName="visitDate" inputType="date" width="300px"
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="방문시간: " inputName="visitTime" inputType="time" width="300px"
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="예상 인원: " inputName="childrenNumber" inputType="number" width="300px"
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="변경사항: " inputName="changeThing" inputType="text" width="300px"
                                    rows="3"
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="통화이력: " inputName="callStatus" inputType="select" width="300px"
                                    contents={["미완료", "통화완료", "부재중", "통화오류"]} setValueFunction={onChange}
                    />
                </div>

                <div style={{marginBottom: "20px", display: `${disable.absentCount}`}}>
                    <InputContainer labelContent="부재중 횟수: " inputType="number" width="300px"
                                    setValueFunction={onChange}/>
                </div>

                <div style={{marginBottom: "20px", display: `${disable.errorReason}`}}>
                    <InputContainer labelContent="통화오류 사유: " inputName="errorReason" inputType="text" width="300px"
                                    setValueFunction={onChange}/>
                </div>
            </div>
            <div style={{position: "relative"}}>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="특이사항: " inputName="specialInfo" inputType="text" width="300px"
                                    rows="3"
                                    setValueFunction={onChange}/>
                </div>


                <div style={{marginLeft: "80px"}}>
                    <CheckboxContainer name="applicationForm" setCheckboxInputFunction={onClick} content="신청서 완료"/>
                    <CheckboxContainer name="placeArrangement" setCheckboxInputFunction={onClick} content="장소 마련 완료"/>
                    <CheckboxContainer name="visitDateConfirm" setCheckboxInputFunction={onClick} content="방문일정 확인 완료"/>
                </div>


                <div style={{position: "absolute", bottom: "20px", right: "20px", display: "flex"}}>
                    <div style={{marginRight: "20px"}}>
                        <CustomButton type="reverse" width="150px" height="40px" content="취소" color="black"
                                      border="1px solid #FFE400"
                                      borderRadius="15px" backgroundColor="white" onClick={props.onClickFunction}/>
                    </div>

                    <div>
                        <CustomButton type="normal" width="150px" height="40px" content="저장" color="black"
                                      borderRadius="15px" backgroundColor="#FFE400" onClick={props.onClickFunction}/>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ScheduleModifyInputForm;