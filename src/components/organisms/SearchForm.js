import React from 'react';
import CustomButton from "../atoms/CustomButton";
import InputContainer from "../molecules/InputContainer";

function SearchForm(props) {
    return (<div style={{display: "flex", alignItems:"center"}}>
            <InputContainer labelContent="이름검색" inputName="centerInfo" inputType="text" width="300px" rows="1"
            />
            <InputContainer labelContent="주소검색" inputName="centerInfo" inputType="text" width="300px" rows="1"
            />
            <InputContainer labelContent="번호검색" inputName="centerInfo"
                            inputType="text" width="300px" rows="1"
            />
            <div style={{marginLeft: "20px"}}>
                <CustomButton type="normal" width="100px" height="30px" content="저장" color="black"
                              borderRadius="15px" backgroundColor="#FFE400"/>
            </div>

        </div>
    );
}

export default SearchForm;