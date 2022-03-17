import React, {createRef, useEffect, useRef, useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";
import CustomLabel from "../atoms/CustomLabel";
import question from '../media/question.png';
import {Checkbox} from "@mui/material";
import CheckboxContainer from "../molecules/CheckboxContainer";


function AgentManageInputForm(props) {
    const [selectedImage, setSelectedImage] = useState(null);

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        console.log("hi")
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleImgError = (e) => {
        e.target.src = question;
    }



    return (
        <div style={{
            padding: "30px 0px",
            display: "flex",
            justifyContent: "center",
            position: "relative"
        }}>
            <div>
                <div style={{marginBottom: "20px", marginRight: "50px"}}>
                    <InputContainer labelContent="이름: " inputName="a_name" inputType="text" width="300px" row="1"
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_name']}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="현장요원코드: " inputName="a_code" inputType="text" width="300px" row="1"
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_code']}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="전화번호: " inputName="a_ph" inputType="text" width="300px" row="1"
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_ph']}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="아이디: " inputName="a_nickname" inputType="text" width="300px" row="1"
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_nickname']}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="비밀번호: " inputName="a_pwd" inputType="text" width="300px" row="1"
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_pwd']}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="차량여부:" inputName="a_hasCar" inputType="select" width="300px"
                                    contents={[{show: "자차", value: true}, {show: "도보", value: false}]}
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_hasCar']}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="자택주소: " inputName="a_address" inputType="text" width="300px" rows="2"
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_address']}/>

                </div>
            </div>

            <div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="장비번호: " inputName="a_equipment" inputType="text" width="300px"
                                    rows="1"
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_equipment']}/>

                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="장비수령날짜: " inputName="a_receiveDate" inputType="date" width="300px"
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_receiveDate']}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <InputContainer labelContent="퇴사여부: " inputName="a_status" inputType="select" width="300px"
                                    contents={[{
                                        show: "재직", value: true
                                    }, {show: "퇴사", value: false}]}
                                    setValueFunction={props.handleInputFormChange}
                                    defaultValue={props.currentInfo['a_status']}/>
                </div>
                <div style={{display: !props.modify?"none":"flex", alignItems: "center"}}>
                    <CustomLabel content={"사진 업로드: "} fontSize={props.fontSize} width={"auto"}/>
                    <input type="file" id="chooseFile" name="a_picture" accept="image/*"
                           onChange={(e)=>{
                               imageChange(e);
                               props.handleInputFormChange(e)
                           }} style={{width: "200px"}}/>
                </div>
                <div style={{display: !props.modify?"none":"block", marginLeft: 125}}>
                    <CheckboxContainer name="deletePicture" clickFunction={props.clickCheckboxFunction} content="사진삭제" />
                    <div style={{ marginLeft: 10}}>
                        <img src={selectedImage===null?`http://${process.env.REACT_APP_IP_ADDRESS}:8080/agent/show?agent_id=${props.currentInfo.agent_id}&time=${new Date().getTime()}`:URL.createObjectURL(selectedImage)}
                             onError={handleImgError} style={{width: "100px", height: "100px"}}/>
                    </div>
                </div>
            </div>

            <div style={{display: "flex", marginTop: "20px", position: "absolute", bottom: 0, right: 0}}>
                <div style={{marginRight: "30px"}}>
                    <CustomButton type="reverse" width="150px" height="40px" content="취소" color={Style.color2}
                                  border={`1px solid ${Style.color2}`}
                                  borderRadius="10px" backgroundColor={Style.color1} onClick={props.handleClose}/>
                </div>

                <div>
                    <CustomButton type="normal" width="150px" height="40px" content="저장" color={Style.color1}
                                  borderRadius="10px" backgroundColor={Style.color2}
                                  onClick={props.handleClickSave}/>
                </div>
            </div>

        </div>
    );
}

export default AgentManageInputForm;