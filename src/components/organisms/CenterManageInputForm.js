import React, {useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";
import styled from 'styled-components';
import Box from '@mui/material/Box';


function CenterManageInputForm(props) {
    const [input, setInput] = useState({
        centerInfo: "",
        centerId: "",
        centerPhone: "",
        centerAddress: ""
    })

    const onChange = (e) => {
        // console.log(e);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInput({
            ...input, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
        // console.log(input);
    }

    return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="시설정보: " inputName="centerInfo" inputType="text" width="20vw" rows="2"
                                    setValueFunction={onChange}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="시설 아이디: " inputName="centerId" inputType="text" width="20vw" rows="1"
                                    setValueFunction={onChange}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="전화번호: " inputName="centerPhone" inputType="text" width="20vw" rows="1"
                                    setValueFunction={onChange}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="시설 주소: " inputName="centerAddress" inputType="text" width="20vw"
                                    rows="2"
                                    setValueFunction={onChange}/>
                </div>
                <div style={{display: "flex", marginTop: "20px"}}>
                    <div style={{marginRight: "30px"}}>
                        <CustomButton type="reverse" width="150px" height="40px" content="취소" color="black"
                                      border="1px solid #FFE400"
                                      borderRadius="10px" backgroundColor="white" onClick={props.onClickCancel}/>
                    </div>

                    <div>
                        <CustomButton type="normal" width="150px" height="40px" content="저장" color="black"
                                      borderRadius="10px" backgroundColor="#FFE400" onClick={props.onClickSave}/>
                    </div>
                </div>
            </div>

    );
}

export default CenterManageInputForm;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};