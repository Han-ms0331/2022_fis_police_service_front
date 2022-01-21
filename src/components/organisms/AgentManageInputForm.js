import React, {useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";

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
                <InputContainer labelContent="이름: " inputName="a_name" inputType="text" width="300px" row="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['a_name']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="현장요원코드: " inputName="a_code" inputType="text" width="300px" row="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['a_code']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="전화번호: " inputName="a_ph" inputType="text" width="300px" row="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['a_ph']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="차량여부:" inputName="a_hasCar" inputType="select" width="300px"
                                contents={["자차", "도보"]} setValueFunction={props.handleInputFormChange}defaultValue={props.currentInfo['a_hasCar']}  />
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="자택주소: " inputName="a_address" inputType="text" width="300px" rows="2"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['a_address']}/>

            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="장비번호: " inputName="a_equipment" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['a_equipment']}/>

            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="장비수령날짜: " inputName="a_receiveDate" inputType="date" width="300px"
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['a_receiveDate']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="퇴사여부: " inputName="a_status" inputType="select" width="300px" contents={["재직","퇴사"]}
                                setValueFunction={props.handleInputFormChange} defaultValue={props.currentInfo['a_status']}/>
            </div>

            <div style={{display: "flex", marginTop: "20px"}}>
                <div style={{marginRight: "30px"}}>
                    <CustomButton type="reverse" width="150px" height="40px" content="취소" color={Style.color2}
                                  border= {`1px solid ${Style.color2}`}
                                  borderRadius="10px" backgroundColor={Style.color1} onClick={props.handleClose}/>
                </div>

                <div>
                    <CustomButton type="normal" width="150px" height="40px" content="저장" color={Style.color1}
                                  borderRadius="10px" backgroundColor={Style.color2} onClick={props.handleClickSave}/>
                </div>
            </div>

        </div>
    );
}

export default AgentManageInputForm;