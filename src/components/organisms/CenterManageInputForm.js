import React, {useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";


function CenterManageInputForm(props) {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>

            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="시설 이름: " inputName="c_name" inputType="text" width="300px" rows="2"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['c_name']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="전화번호: " inputName="c_ph" inputType="text" width="300px" rows="1"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['c_ph']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="시설 주소: " inputName="c_address" inputType="text" width="300px"
                                rows="2"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['c_address']}/>
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

    );
}

export default CenterManageInputForm;
