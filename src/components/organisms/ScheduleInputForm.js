import React, {useEffect} from 'react';
import InputContainer from "../molecules/InputContainer";
import {useRecoilValue} from "recoil";
import {ClickedAgentInfo} from "../../store/SelectedAgentStore";
import {SelectedDateState} from "../../store/SelectedDateStore";
import styled from "styled-components";

/*
    날짜: 2022/01/24 12:58 오후
    작성자: 한명수
    작성내용: 일정 추가 버튼을 누를시 나오는 폼
*/

function ScheduleInputForm(props) {
    const {currentInfo, setCurrentInfo} = props

    const clickedAgent = useRecoilValue(ClickedAgentInfo);
    const selectedDate = useRecoilValue(SelectedDateState);

    const handleInputFormChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출{
        setCurrentInfo({
            ...currentInfo, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    }

    /*
        날짜: 2022/01/18 3:38 오후
        작성자: 한명수
        작성내용: 현재 입력하는 날짜 세팅
    */
    const date = new Date()
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    const today = date.getFullYear() + '-' + month + '-' + day
    useEffect(() => {
        setCurrentInfo({
            ...currentInfo,
            receipt_date: today,
            visit_date: selectedDate.getFullYear() + "-" + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + "-" + ('0' + selectedDate.getDate()).slice(-2)
        });
    }, [])

    return (
        <Container>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="현장요원: " inputName="agent" inputType="text" width="250px" row="1"
                                defaultValue={clickedAgent.a_code + clickedAgent.a_name}
                                disabled={true} setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="연락일자: " inputName="receipt_date" inputType="text" width="250px" row="1"
                                defaultValue={today} disabled={true} setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="방문 예정 일자: " marginLeft="20px" inputName="visit_date" inputType="text"
                                width="200px" row="1"
                                defaultValue={selectedDate.getFullYear() + "-" + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + "-" + ('0' + selectedDate.getDate()).slice(-2)}
                                disabled={true} setValueFunction={handleInputFormChange}
                />
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="방문 예정 시간: " inputName="visit_time" inputType="time" width="200px" row="1"
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="예상 인원: " inputName="estimate_num" inputType="number" width="200px" row="1"
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent="시설 특이사항: " inputName="center_etc" inputType="text" width="420px" rows="3"
                                setValueFunction={handleInputFormChange}/>
            </div>
            <div style={{marginBottom: "20px"}}>
                <InputContainer labelContent={"현장요원 특이사항:"} inputName="agent_etc" inputType="text" width="420px" rows="3"
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
  width: 550px;
  height: 400px;
  padding: 0;
  font-size: 16px;
`;
export default ScheduleInputForm;