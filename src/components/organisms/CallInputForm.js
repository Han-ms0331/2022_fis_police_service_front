import React, {useEffect} from 'react';
import InputContainer from "../molecules/InputContainer";
import CustomInput from "../atoms/CustomInput";
import styled from "styled-components";

/*
    날짜: 2022/01/18 3:38 오후
    작성자: 한명수
    작성내용: 연락기록 저장 버튼을 누르면 나오는 폼 제작
*/

function CallInputForm(props) {
    const {data, currentInfo, setCurrentInfo} = props

    const handleInputFormChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출{
            setCurrentInfo({
                ...currentInfo, // 기존의 input 객체를 복사한 뒤
                [name]: value // name 키를 가진 값을 value 로 설정
        })
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
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    const today = date.getFullYear() + '-' + month+ '-' + day + "ㅤ" + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
    useEffect(() => {
        setCurrentInfo({
            ...currentInfo, // 기존의 input 객체를 복사한 뒤
            dateTime: today // name 키를 가진 값을 value 로 설정
        });
    }, [])
    return (
        // <InputContainer labelContent="권한: " inputName="u_auth" inputType="select" width="300px"
        //                 contents={[{show: "관리자", value: "ADMIN"}, {show: "일반직원", value: "USER"}, {
        //                     show: "퇴사",
        //                     value: "FIRED"
        //                 }]} setValueFunction={props.handleInputFormChange}
        //                 defaultValue={props.currentInfo['u_auth']}

        <Container>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="인/아웃바운드:  " inputName="in_out" inputType="select"
                                contents={[{show: "인", value: "IN"}, {show: "아웃", value: "OUT"}]}
                                width="100px" marginLeft={"2px"} marginrow="1"
                                defaultValue={data===undefined?"":data.in_out}
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="연락일자: " inputName="dateTime" inputType="text" width="350px" row="1"
                                defaultValue={today} disabled={true} setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="시설 참여여부: " inputName="participation" inputType="select"
                                contents={[{show: "없음", value: "NONE"}, {
                                    show: "참여",
                                    value: "PARTICIPATION"
                                }, {show: "보류", value: "HOLD"}, {show: "거부", value: "REJECT"}]}
                                width="100px" row="1"
                                defaultValue={data===undefined?"":data.participation}
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
                             contents={[
                                 {show: "naver.com", value: "naver.com"},
                                 {show: "google.com", value: "google.com"},
                                 {show: "hanmail.com", value: "hanmail.com"},
                                 {show: "직접입력", value: "직접입력"}
                             ]}
                             width={"150px"} row={"1"}
                             defaultValue={mail === undefined ? mail : mail[1]}
                             setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="담당자 전화번호: " inputName="m_ph" inputType="text" width="150px" row="1"
                                defaultValue={data === undefined ? "" : data.m_ph}
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="시설 특이사항: " inputName="center_etc" inputType="text" width="420px" rows="3"
                                defaultValue={data === undefined ? "" : data.center_etc}
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent='현장요원 특이사항: ' inputName="agent_etc" inputType="text" width="420px" rows="3"
                                defaultValue={data === undefined ? "" : data.agent_etc}
                                setValueFunction={handleInputFormChange}/>
            </div>

        </Container>
    );
}
//style

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 646px;
  height: 530px;
  padding: 0;
  font-size: 15px;
`;

export default CallInputForm;