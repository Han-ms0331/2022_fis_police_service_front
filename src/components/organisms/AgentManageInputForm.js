import React, {useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";

function AgentManageInputForm(props) {
    return (
        <div style={{
            padding: "30px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="이름: " inputName="agentName" inputType="text" width="300px" row="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['agentName']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="현장요원코드: " inputName="agentCode" inputType="text" width="300px" row="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['agentCode']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="전화번호: " inputName="agentPhone" inputType="text" width="300px" row="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['agentPhone']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="차량여부:" inputName="agentHasCar" inputType="select" width="300px"
                                contents={["자차", "도보"]} setValueFunction={props.handleInputFormChange}defaultValue={props.currentInfo['agentHasCar']}  />
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="자택주소: " inputName="agentAddress" inputType="text" width="300px" rows="2"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['agentAddress']}/>

            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="장비번호: " inputName="deviceNumber" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['deviceNumber']}/>

            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="장비수령날짜: " inputName="receiveDate" inputType="date" width="300px"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['receiveDate']}/>
            </div>


            <div style={{display: "flex", marginTop: "20px"}}>
                <div style={{marginRight: "30px"}}>
                    <CustomButton type="reverse" width="150px" height="40px" content="취소" color="black"
                                  border="1px solid #FFE400"
                                  borderRadius="10px" backgroundColor="white" onClick={props.handleClose}/>
                </div>

                <div>
                    <CustomButton type="normal" width="150px" height="40px" content="저장" color="black"
                                  borderRadius="10px" backgroundColor="#FFE400" onClick={props.handleClickSave}/>
                </div>
            </div>

        </div>
    );
}

export default AgentManageInputForm;