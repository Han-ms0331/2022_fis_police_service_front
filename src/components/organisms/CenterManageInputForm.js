import React, {useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";
import {Style} from "../../Style";


function CenterManageInputForm(props) {

    const sidoList = [
        {show:"서울특별시",value:"서울특별시"},
        {show:"부산광역시",value:"부산광역"},
        {show:"대구광역시",value:"대구광역"},
        {show:"인천광역시",value:"인천광역시"},
        {show:"광주광역시",value:"광주광역시"},
        {show:"대전광역시",value:"대전광역시"},
        {show:"울산광역시",value:"울산광역시"},
        {show:"세종특별자치시",value:"세종특별자치시"},
        {show:"경기도",value:"경기도"},
        {show:"강원도",value:"강원도"},
        {show:"충청북도",value:"충청북도"},
        {show:"충청남도",value:"충청남도"},
        {show:"전라북도",value:"전라북도"},
        {show:"전라남도",value:"전라남도"},
        {show:"경상북도",value:"경상북도"},
        {show:"경상남도",value:"경상남도"},
        {show:"제주특별자치도",value:"제주특별자치도"}
    ]
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
                <InputContainer labelContent="시도:" inputName="c_sido" inputType="select" width="300px"
                                contents={sidoList}
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['c_sido']}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="시군구: " inputName="c_sigungu" inputType="text" width="300px"
                                rows="1"
                                setValueFunction={props.handleInputFormChange}
                                defaultValue={props.currentInfo['c_sigungu']}/>
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
