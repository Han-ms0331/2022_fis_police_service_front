import React, {useState} from 'react';
import CustomButton from "../atoms/CustomButton";
import InputContainer from "../molecules/InputContainer";
import {Style} from "../../Style";

function SearchForm(props) {
    return (<div style={{display: "flex", alignItems: "flex-end", width: props.width, height: props.height}}>
            <div style={{marginRight: "20px"}}>
                <InputContainer labelContent="이름검색" inputName="centerName" inputType="text" width="200px" rows="1"
                                flexDirection="column" setValueFunction={props.setSearch}/>
            </div>

            <div style={{marginRight: "20px"}}>
                <InputContainer labelContent="주소검색" inputName="centerAddress" inputType="text" width="350px" height="40px" rows="1"
                                flexDirection="column" setValueFunction={props.setSearch}
                />
            </div>

            <div style={{marginRight: "20px"}}>
                <InputContainer labelContent="번호검색" inputName="centerPhone"
                                inputType="text" width="200px" height="40px"rows="1" flexDirection="column"
                                setValueFunction={props.setSearch}
                />
            </div>

            <div>
                <CustomButton type="normal" width="120px" height="42px" content="검색" color={Style.color1}
                              borderRadius="10px" backgroundColor={Style.color2} onClick={props.onSubmitFunction}/>
            </div>

        </div>
    );
}

export default SearchForm;