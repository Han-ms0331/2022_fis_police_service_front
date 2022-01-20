import React, {useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";

function UserManageInputForm(props) {
    const [input, setInput] = useState({
        userName: "",
        userId: "",
        userPassword: "",
        userPhone: "",
        userAuth: "",
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
                <InputContainer labelContent="이름: " inputName="name" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['name']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="아이디: " inputName="username" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['username']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="비밀번호: " inputName="password" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['password']}/></div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="입사일: " inputName="start" inputType="date" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['start']}/></div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="전화번호: " inputName="hp" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['hp']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="권한: " inputName="auth" inputType="select" width="300px"
                                contents={["관리자", "일반직원"]} setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['auth']}
                />
            </div>
            <div style={{display: "flex", marginTop: "20px"}}>
                <div style={{marginRight: "30px"}}>
                    <CustomButton type="reverse" width="150px" height="40px" content="취소" color={Style.color2}
                                  border={`1px solid ${Style.color1}`}
                                  borderRadius="10px" backgroundColor={Style.color1}onClick={props.handleClose}/>
                </div>

                <div>
                    <CustomButton type="normal" width="150px" height="40px" content="저장" color={Style.color1}
                                  borderRadius="10px" backgroundColor={Style.color2} onClick={props.handleClickSave}/>
                </div>
            </div>
        </div>
    )
        ;
}

export default UserManageInputForm;