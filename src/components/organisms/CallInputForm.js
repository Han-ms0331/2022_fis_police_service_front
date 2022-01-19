import React from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomInput from "../atoms/CustomInput";

/*
    날짜: 2022/01/18 3:38 오후
    작성자: 한명수
    작성내용: 연락기록 저장 버튼을 누르면 나오는 폼 제작
*/

function CallInputForm(props) {
    const {data, currentInfo, setCurrentInfo} = props

    const handleInputFormChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출{
        if (name === "email_form") {
            if (value !== "직접입력") {
                setCurrentInfo({
                    ...currentInfo,
                    m_email: currentInfo.m_email +"@"+value    //직접입력이 아닌 미리 입력된 이메일 폼 사용시 더함
                })
            }
        } else {
            setCurrentInfo({
                ...currentInfo, // 기존의 input 객체를 복사한 뒤
                [name]: value // name 키를 가진 값을 value 로 설정
            });
        }
        console.log(currentInfo.m_email);
    };

    let mail
    if (data !== undefined) {
        mail = data.m_email.split("@");
        if (mail[1] !== "naver.com" && mail[1] !== "google.com" && mail[1] !== "hanmail.com") {     //사용 mail주소가 미리 입력된 메일이 아닐 경우 직접입력으로 사용
            mail[0] = mail[0] + "@" + mail[1];
            mail[1] = "직접입력"
        }
    }
    /*
        날짜: 2022/01/18 3:38 오후
        작성자: 한명수
        작성내용: 현재 입력하는 날짜 세팅
    */
    const date = new Date()
    const today = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()


    return (
        <div style={{width: "100%", height: "530px", padding: "10px"}}>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="인/아웃바운드: " inputName="in_out" inputType="select" contents={["인", "아웃"]}
                                width="100px" row="1" defaultValue={data === undefined ? "" : data.in_out}
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="연락일자: " inputName="dateTime" inputType="text" width="150px" row="1"
                                defaultValue={today} disabled={true} setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="시설 참여여부: " inputName="participation" inputType="select"
                                contents={["없음", "참여", "보류", "거부"]} width="100px" row="1"
                                defaultValue={data === undefined ? "" : data.participation}
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="담당자 이름: " inputName="c_manager" inputType="text" width="150px" row="1"
                                defaultValue={data === undefined ? "" : data.c_manager}
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px", display: "flex", alignItems: "center"}}>
                <InputContainer labelContent="담당자 이메일: " inputName="m_email" inputType="text" width="200px" row="1"
                                defaultValue={data === undefined ? "" : mail[0]}
                                setValueFunction={handleInputFormChange}/>
                <div style={{margin: "0px 5px"}}>@</div>
                <CustomInput inputName={"email_form"} type={"select"}
                             name={"email_form"}
                             contents={["naver.com", "google.com", "hanmail.com", "직접입력"]} width={"150px"} row={"1"}
                             defaultValue={mail[1]} setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="담당자 전화번호: " inputName="m_email" inputType="text" width="150px" row="1"
                                defaultValue={data === undefined ? "" : data.m_ph}
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="시설 특이사항: " inputName="center_etc" inputType="text" width="100%" rows="3"
                                defaultValue={data === undefined ? "" : data.center_etc}
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="현장요원 특이사항: " inputName="agent_etc" inputType="text" width="100%" rows="3"
                                defaultValue={data === undefined ? "" : data.agent_etc}
                                setValueFunction={handleInputFormChange}/>
            </div>

        </div>
    );
}

export default CallInputForm;