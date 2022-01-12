import React, {useState} from 'react';
import CustomButton from "../atoms/CustomButton";
import InputContainer from "../molecules/InputContainer";

function SearchForm(props) {
    const [input, setInput] = useState({
        centerName: "",
        centerAddress: "",
        centerPhone: ""
    })

    const onChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInput({
            ...input, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
        console.log(input)
    }


    return (<div style={{display: "flex", alignItems: "flex-end", width: "100%"}}>
            <div style={{marginRight: "20px"}}>
                <InputContainer labelContent="이름검색" inputName="centerName" inputType="text" width="300px" rows="1"
                                flexDirection="column" setValueFunction={onChange}/>
            </div>

            <div style={{marginRight: "20px"}}>
                <InputContainer labelContent="주소검색" inputName="centerAddress" inputType="text" width="300px" rows="1"
                                flexDirection="column" setValueFunction={onChange}
                />
            </div>

            <div style={{marginRight: "20px"}}>
                <InputContainer labelContent="번호검색" inputName="centerPhone"
                                inputType="text" width="300px" rows="1" flexDirection="column"
                                setValueFunction={onChange}
                />
            </div>

            <div>
                <CustomButton type="normal" width="100px" height="60px" content="저장" color="black"
                              borderRadius="10px" backgroundColor="#FFE400" onClick={props.onSubmitFunction}/>
            </div>

        </div>
    );
}

export default SearchForm;