import React from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";

function UserManageInputForm(props) {


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="이름: " inputName="u_name" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['u_name']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="아이디: " inputName="u_nickname" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['u_nickname']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="비밀번호: " inputName="u_pwd" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['u_pwd']}/></div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="입사일: " inputName="u_sDate" inputType="date" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['u_sDate']}/></div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="전화번호: " inputName="u_ph" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['u_ph']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="권한: " inputName="u_auth" inputType="select" width="300px"
                                contents={[{show: "관리자", value: "ADMIN"}, {show: "일반직원", value: "USER"}, {
                                    show: "퇴사",
                                    value: "FIRED"
                                }]} setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['u_auth']}
                />
            </div>
            <div style={{display: "flex", marginTop: "20px"}}>
                <div style={{marginRight: "30px"}}>
                    <CustomButton type="reverse" width="150px" height="40px" content="취소" color={Style.color2}
                                  border={`1px solid ${Style.color2}`}
                                  borderRadius="10px" backgroundColor={Style.color1} onClick={props.handleClose}/>
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