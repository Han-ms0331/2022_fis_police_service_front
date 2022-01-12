import React, {useState} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomButton from "../atoms/CustomButton";

function AgentManageInputForm(props) {
    const [input, setInput] = useState({
        agentName: "",
        agentId: "",
        agentCode: "",
        agentPhone: "",
        agentHasCar: "",
        agentAddress: "",
    })
    const onChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInput({
            ...input, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
        console.log(input);
    }
    return (
        <div style={{
            width: "70vw",
            height: "70vh",
            border: "1px solid black",
            padding: "30px 0px",
            position: "relative",
            display: "flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <InputContainer labelContent="이름: " inputName="agentName" inputType="text" width="300px" row="1"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="아이디: " inputName="agentId" inputType="text" width="300px" row="1"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="현장요원코드: " inputName="agentCode" inputType="text" width="300px" row="1"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="전화번호: " inputName="agentPhone" inputType="text" width="300px" row="1"
                            setValueFunction={onChange}/>
            <InputContainer labelContent="차량여부:" inputName="agentHasCar" inputType="select" width="300px"
                            contents={["자차", "도보"]} setValueFunction={onChange}
            />
            <InputContainer labelContent="전화번호: " inputName="agentAddress" inputType="text" width="300px" row="1"
                            setValueFunction={onChange}/>


            <div style={{position: "absolute", bottom: "20px", right: "20px", display: "flex"}}>
                <div style={{marginRight: "20px"}}>
                    <CustomButton type="reverse" width="100px" height="30px" content="취소" color="black"
                                  border="1px solid #FFE400"
                                  borderRadius="15px" backgroundColor="white" onClick={props.onClickFunction}/>
                </div>

                <div>
                    <CustomButton type="normal" width="100px" height="30px" content="저장" color="black"
                                  borderRadius="15px" backgroundColor="#FFE400" onClick={props.onClickFunction}/>
                </div>
            </div>

        </div>
    );
}

export default AgentManageInputForm;