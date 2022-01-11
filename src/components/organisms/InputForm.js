import React, {useEffect, useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CheckboxContainer from "../molecules/CheckboxContainer";

function InputForm(props) {
    const [input, setInput] = useState({
        centerInfo: "",
        agentCode: "",
        visitDate: "",
        visitTime: "",
        childrenNumber: "",
        changeThing: "",
        callStatus: "",
        absentCount: "",
        errorReason: "",
        specialInfo: ""
    })

    const [checkboxInput, setCheckBoxInput] = useState({
        applicationForm: false,
        placeArrangement:false,
        visitDateConfirm:false
    })

    // useEffect(() => {
    //     console.log("1")
    // }, [input])

    const onChange = (e) => {
        // console.dir(e.target);
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInput({
            ...input, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    const onClick = (e)=>{
        // console.dir(e.target)
        const {checked, name} = e.target;
        setCheckBoxInput({
            ...checkboxInput, // 기존의 input 객체를 복사한 뒤
            [name]: checked // name 키를 가진 값을 value 로 설정
        });
        // console.log(checkboxInput)
    }

    return (
        <div>
            <InputContainer labelContent="시설정보: " inputName="centerInfo" inputType="text" width="300px" row="2"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="현장요원코드: " inputName="agentCode" inputType="text" width="300px"
                            row="1"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="방문날짜: " inputName="visitDate" inputType="date" width="300px"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="방문시간: " inputName="visitTime" inputType="time" width="300px"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="예상 인원: " inputName="childrenNumber" inputType="number" width="300px"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="변경사항: " inputName="changeThing" inputType="text" width="300px" row="2"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="통화이력: " inputName="callStatus" inputType="select" width="300px"
                            contents={["미완료", "통화완료", "부재중", "통화오류"]} setValueFunction={onChange}
            />
            <InputContainer labelContent="부재중 횟수: " inputType="number" width="300px"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="통화오류 사유: " inputName="errorReason" inputType="text" width="300px"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="특이사항: " inputName="specialInfo" inputType="text" width="300px"
                            setValueFunction={onChange}/>
            <CheckboxContainer name="applicationForm" setCheckboxInputFunction={onClick} content="신청서 완료"/>
            <CheckboxContainer name="placeArrangement" setCheckboxInputFunction={onClick} content="장소 마련 완료"/>
            <CheckboxContainer name="visitDateConfirm" setCheckboxInputFunction={onClick} content="방문일정 확인 완료"/>

        </div>
    );
}

export default InputForm;